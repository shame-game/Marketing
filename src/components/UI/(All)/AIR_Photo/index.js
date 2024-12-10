'use client';

import { useState } from 'react';
import { SVG_image, SVG_x } from '@/svg/svg'
import Loading from '@/component/loading';
import Menu from '@/component/Dropdown';
export default function ImageUploader() {
  const [images, setImages] = useState([]);
  const [loading, setIsLoading] = useState(false)
  // Hàm gán hình đã tải vào biến
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileDetails = [...files].map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: formatFileSize(file.size),
      }));

      setImages((prevImages) => [...prevImages, ...fileDetails]);
    }
  };
  // Hàm xóa ảnh đã tải lên
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  // Hàm lưu ảnh vào drive
  const handleSaveImages = async () => {
    setIsLoading(true)
    if (images.length === 0) {
      console.error("Không có hình ảnh nào để tải lên.");
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        const response = await fetch(images[i].url);
        const blob = await response.blob();
        formData.append("file", new File([blob], images[i].name, { type: blob.type }))
      }
      const response = await fetch("/api/UpImage", { method: "POST", body: formData, })

      if (response.ok) {
        const data = await response.json();
        setImages([])
      } else {
        const error = await response.json();
        alert(`Lỗi khi tải lên: ${error.error}`);
      }
    } catch (error) {
      alert("Lỗi khi lưu hình ảnh. Vui lòng thử lại.");
    }
    setIsLoading(false)
  };

  return (
    <>
      <div style={{ borderRadius: 16, width: images ? 900 : 500, position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', background: 'white', padding: 16 }}>
        <label className="upload-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', border: '2px dashed #ccc', borderRadius: '10px', cursor: 'pointer' }}>
          <SVG_image w={55} h={55} />
          <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
          <p style={{ padding: '8px 12px 26px 0', color: `${color_background}` }}>Kéo và Thả, Tải lên hoặc Dán hình ảnh</p>
          <p style={{ padding: '8px 20px', fontSize: `${size}`, backgroundColor: `${color_main}`, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Tải ảnh lên</p>
        </label>
        {images.length ?
          <div style={{ marginLeft: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 6, }}>
            <div className="image-preview" style={{
              width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 8,
              alignItems: 'start', overflow: 'hidden', overflowY: 'scroll', height: 300, paddingRight: 12, paddingBottom: 6
            }}>
              {images.map((image, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: 8, alignItems: 'center', height: 'max-content', width: '100%', border: '1px solid #cccccc', borderRadius: 8 }}>
                  <div style={{ height: 'max-content', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img key={index} src={image.url} alt={`Upload Preview ${index}`} style={{ width: '70px', height: '45px', objectFit: 'cover', borderRadius: '5px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <p>{image.name}</p>
                      <p style={{ color: '#606060', fontSize: '14px' }}>Kích thước: {image.size}</p>
                    </div>
                  </div>
                  <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => handleRemoveImage(index)}>
                    <SVG_x w={25} h={25} c={'#cccccc'} />
                  </div>
                </div>
              ))}
            </div>
            <button style={{
              padding: '8px', border: 'none', borderRadius: 4, backgroundColor: `${color_main}`, color: `${color_text_l}`,
              fontWeight: 500, cursor: 'pointer', fontSize: `${size}`
            }} onClick={handleSaveImages}>
              Lưu hình ảnh
            </button>
          </div> : null
        }
      </div >
      {loading ? <Loading /> : null}
      <Menu />
    </>);
}

const formatFileSize = (sizeInBytes) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  const kb = sizeInBytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
};

// Màu sắc và thuộc tính của component
const color_main = '#03abe3'
const color_background = '#333333'
const color_text_d = '#999999'
const color_text_l = 'white'
const size = '16px'