import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  value?: string;
  onChange: (file: File | string) => void;
}

export function FileUpload({ value, onChange }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // --- KEY FIX STARTS HERE ---
  const handleFile = (file: File) => {
    // We use FileReader to convert image to Base64 string
    // This ensures the image survives a page refresh!
    const reader = new FileReader();
    reader.onloadend = () => {
      // The result is a long string starting with "data:image/..."
      onChange(reader.result as string); 
    };
    reader.readAsDataURL(file);
  };
  // --- KEY FIX ENDS HERE ---

  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-300">Project Image</label>
      
      <div
        className={`relative h-48 rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out flex flex-col items-center justify-center cursor-pointer overflow-hidden
          ${dragActive 
            ? "border-indigo-500 bg-indigo-500/10" 
            : "border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800/50"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        {value ? (
          <div className="relative w-full h-full group">
            <img 
              src={value} 
              alt="Project preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium">Click or Drop to Change</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center p-4 space-y-3 pointer-events-none">
            <div className={`p-3 rounded-full inline-flex ${dragActive ? 'bg-indigo-500/20' : 'bg-slate-800'}`}>
              <Upload className={`w-6 h-6 ${dragActive ? 'text-indigo-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <p className="text-slate-200 font-medium">
                Click or drag image to upload
              </p>
              <p className="text-slate-500 text-sm mt-1">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}