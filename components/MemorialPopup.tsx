
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const MemorialPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); // ตั้งค่าเริ่มต้นเป็น true เสมอ
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // แสดงผลทันทีเมื่อ Component mount
    const duration = 10000; // 10 วินาที
    const intervalTime = 100;
    const steps = duration / intervalTime;
    
    // ตัวนับเวลาปิดอัตโนมัติ
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    // แถบความคืบหน้า
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - (100 / steps)));
    }, intervalTime);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl animate-[fadeIn_0.5s_ease-out]">
      <div className="relative max-w-2xl w-full bg-[#f8f5e9] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/20 animate-[scaleUp_0.4s_ease-out]">
        
        {/* ปุ่มปิด (กากบาท) */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 p-2 bg-black/40 hover:bg-party-rose text-white rounded-full transition-all backdrop-blur-md active:scale-90"
          aria-label="ปิดหน้าต่าง"
        >
          <X size={24} />
        </button>

        {/* ส่วนรูปภาพ */}
        <div className="relative aspect-[3/4] md:aspect-video bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
          <img 
            src="https://img5.pic.in.th/file/secure-sv1/S__3366937.png" 
            alt="ถวายความอาลัย"
            className="w-full h-full object-contain animate-[subtleZoom_10s_linear_infinite]"
          />
          {/* ขอบทองบางๆ รอบรูป */}
          <div className="absolute inset-4 border border-yellow-600/30 pointer-events-none"></div>
        </div>

        {/* ส่วนปุ่มกดและแถบเวลา */}
        <div className="bg-white p-8 flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="text-party-black/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">
              Sarunsiriprapha Party Tribute
            </p>
          </div>

          <button 
            onClick={handleClose}
            className="group relative px-12 py-4 bg-party-black text-white text-sm font-bold rounded-full overflow-hidden transition-all hover:bg-party-rose hover:shadow-xl hover:-translate-y-0.5"
          >
            <span className="relative z-10">เข้าสู่เว็บไซต์ (Enter Website)</span>
          </button>
          
          {/* แถบเวลาด้านล่างสุด */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-party-rose transition-all duration-100 linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};
