import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scan, CheckCircle, XCircle, Search, Upload, X, AlertCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

interface ScanResult {
  product: string;
  brand: string;
  sustainability: 'excellent' | 'good' | 'fair' | 'poor';
  score: number;
  reasons: string[];
  scannedData?: string;
}

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [showCamera, setShowCamera] = useState(false);
  const [scanMode, setScanMode] = useState<'barcode' | 'photo' | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const mockScanResults: { [key: string]: ScanResult } = {
    'default': {
      product: 'Organic Cotton T-Shirt',
      brand: 'EcoWear',
      sustainability: 'excellent',
      score: 92,
      reasons: [
        'Organic cotton material',
        'Fair trade certified',
        'Carbon neutral shipping',
        'Recyclable packaging'
      ]
    },
    'barcode': {
      product: 'Bamboo Toothbrush',
      brand: 'GreenBrush',
      sustainability: 'excellent',
      score: 95,
      reasons: [
        'Biodegradable bamboo handle',
        'Plastic-free packaging',
        'Compostable bristles',
        'Zero waste production'
      ]
    },
    'photo': {
      product: 'Reusable Water Bottle',
      brand: 'HydroEco',
      sustainability: 'good',
      score: 78,
      reasons: [
        'Stainless steel construction',
        'BPA-free materials',
        'Recyclable components',
        'Long-lasting design'
      ]
    }
  };

  // Effect to handle camera initialization and cleanup
  useEffect(() => {
    const initializeCamera = async () => {
      if (showCamera && scanMode && streamRef.current) {
        if (scanMode === 'barcode') {
          // Wait for DOM element to be available
          const qrReaderElement = document.getElementById('qr-reader');
          if (qrReaderElement) {
            try {
              const html5QrCode = new Html5Qrcode("qr-reader");
              html5QrCodeRef.current = html5QrCode;

              await html5QrCode.start(
                { facingMode: "environment" },
                {
                  fps: 10,
                  qrbox: { width: 250, height: 250 }
                },
                (decodedText) => {
                  handleScanSuccess(decodedText, 'barcode');
                },
                (errorMessage) => {
                  // Handle scan errors silently
                }
              );
            } catch (error) {
              console.error('Error starting barcode scanner:', error);
              setError('Failed to start barcode scanner. Please try again.');
              setIsScanning(false);
              stopCamera();
            }
          }
        } else if (scanMode === 'photo' && videoRef.current) {
          // Set up video stream for photo capture
          try {
            videoRef.current.srcObject = streamRef.current;
            await videoRef.current.play();
          } catch (error) {
            console.error('Error setting up video stream:', error);
            setError('Failed to start camera for photo capture. Please try again.');
            stopCamera();
          }
        }
      }
    };

    if (showCamera && scanMode && streamRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(initializeCamera, 100);
      return () => clearTimeout(timer);
    }
  }, [showCamera, scanMode]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setCameraPermission('granted');
      streamRef.current = stream;
      setError(null);
      return true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      setCameraPermission('denied');
      setError('Camera access is required for scanning. Please enable camera permissions in your browser settings and try again.');
      return false;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().catch(console.error);
      html5QrCodeRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setScanMode(null);
    setIsScanning(false);
  };

  const startBarcodeScanner = async () => {
    setError(null);
    setIsScanning(true);
    
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      setIsScanning(false);
      return;
    }

    setScanMode('barcode');
    setShowCamera(true);
  };

  const startPhotoCapture = async () => {
    setError(null);
    
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    setScanMode('photo');
    setShowCamera(true);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        
        // Convert to blob and process
        canvas.toBlob((blob) => {
          if (blob) {
            processImageFile(blob, 'photo');
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file, 'upload');
    }
  };

  const processImageFile = (file: Blob, source: string) => {
    setIsScanning(true);
    setError(null);
    stopCamera();
    
    // Simulate processing time
    setTimeout(() => {
      const resultKey = source === 'barcode' ? 'barcode' : source === 'photo' ? 'photo' : 'default';
      const mockResult = { ...mockScanResults[resultKey], scannedData: `Processed from ${source}` };
      
      setResult(mockResult);
      setIsScanning(false);
    }, 2000);
  };

  const handleScanSuccess = (decodedText: string, source: string) => {
    setIsScanning(true);
    stopCamera();
    
    // Simulate API call with decoded barcode data
    setTimeout(() => {
      const mockResult = { 
        ...mockScanResults.barcode, 
        scannedData: `Barcode: ${decodedText}`,
        product: `Product (${decodedText.slice(0, 8)}...)`
      };
      
      setResult(mockResult);
      setIsScanning(false);
    }, 1500);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsScanning(true);
      setError(null);
      
      setTimeout(() => {
        const mockResult = { 
          ...mockScanResults.default, 
          product: searchQuery,
          scannedData: `Search: ${searchQuery}`
        };
        setResult(mockResult);
        setIsScanning(false);
      }, 1500);
    }
  };

  const getSustainabilityColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSustainabilityBg = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-50';
      case 'good': return 'bg-blue-50';
      case 'fair': return 'bg-yellow-50';
      case 'poor': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Is This Sustainable?
        </h1>
        <p className="text-gray-600">
          Scan a barcode, take a photo, or search for a product
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-red-800 text-sm font-medium">Camera Access Required</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Scan Options */}
      {!showCamera && (
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={startBarcodeScanner}
            disabled={isScanning}
            className="flex items-center justify-center p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
          >
            <Scan size={24} className="text-green-600 mr-3" />
            <span className="font-medium text-green-700">
              {isScanning && scanMode === 'barcode' ? 'Starting Scanner...' : 'Scan Barcode'}
            </span>
          </button>

          <button
            onClick={startPhotoCapture}
            disabled={isScanning}
            className="flex items-center justify-center p-6 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
          >
            <Camera size={24} className="text-blue-600 mr-3" />
            <span className="font-medium text-blue-700">
              Take Photo
            </span>
          </button>

          <button
            onClick={handleFileUpload}
            disabled={isScanning}
            className="flex items-center justify-center p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
          >
            <Upload size={24} className="text-purple-600 mr-3" />
            <span className="font-medium text-purple-700">
              Upload Image
            </span>
          </button>
        </div>
      )}

      {/* Camera Interface */}
      {showCamera && (
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <h3 className="font-medium">
              {scanMode === 'barcode' ? 'Scan Barcode' : 'Take Photo'}
            </h3>
            <button
              onClick={stopCamera}
              className="text-white hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
          
          {scanMode === 'barcode' && (
            <div id="qr-reader" className="w-full min-h-[300px]"></div>
          )}
          
          {scanMode === 'photo' && (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover"
                autoPlay
                playsInline
                muted
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={capturePhoto}
                  className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  Capture Photo
                </button>
              </div>
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Loading State */}
      {isScanning && !showCamera && (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600">Analyzing product...</p>
        </div>
      )}

      {/* Scan Result */}
      {result && !isScanning && (
        <div className={`p-6 rounded-lg border-2 ${getSustainabilityBg(result.sustainability)} border-opacity-50`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {result.product}
              </h3>
              <p className="text-sm text-gray-600">{result.brand}</p>
              {result.scannedData && (
                <p className="text-xs text-gray-500 mt-1">{result.scannedData}</p>
              )}
            </div>
            {result.sustainability === 'excellent' || result.sustainability === 'good' ? (
              <CheckCircle className="text-green-600" size={24} />
            ) : (
              <XCircle className="text-red-600" size={24} />
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Sustainability Score
              </span>
              <span className={`text-lg font-bold ${getSustainabilityColor(result.sustainability)}`}>
                {result.score}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  result.sustainability === 'excellent' ? 'bg-green-600' :
                  result.sustainability === 'good' ? 'bg-blue-600' :
                  result.sustainability === 'fair' ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Why this rating?
            </h4>
            <ul className="space-y-1">
              {result.reasons.map((reason, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle size={12} className="text-green-600 mr-2 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => setResult(null)}
            className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Scan Another Product
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;