'use client';

import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function PickPhotoSkill({ Images, onImageSkill, status = '' }) {
  const [images, setImages] = useState('');
  const [open, setOpen] = useState(false);

  const saveImageIntro = (src) => {
    if (src) {
      setImages(src);
      onImageSkill?.(src);
      setOpen(false);
    }
  };

  const openImage = () => setOpen(true)

  const handleClose = () => setOpen(false);

  return (
    <>
      {images || status ? (
        <div
          style={{
            padding: 16,
            width: 'calc(100% - 32px)',
            aspectRatio: 1,
            height: 'auto',
            position: 'relative',
          }}
        >
          <Image
            src={images || status}
            alt="Hình ảnh"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover', borderRadius: '3px', cursor: 'pointer', width: '100%' }}
            onClick={openImage}
          />
        </div>
      ) :
        <div
          style={{
            borderRadius: 8,
            display: 'flex',
            background: 'white',
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            border: '2px dashed #ccc',
            padding: '12px',
            flexDirection: 'column'
          }}
          onClick={openImage}
        >
          <SVG_image w={45} h={45} />
          <p style={{ color: '#333333', textAlign: 'center' }}>Thêm hình ảnh</p>
        </div>}
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <div style={{ padding: 16 }}>
          <p className="text_2" style={{ paddingBottom: 12 }}>
            Chọn hình ảnh giới thiệu
          </p>
          {Images ? Object.keys(Images).length > 0 ? (
            Object.entries(Images).map(([courseId, courseImages]) => {
              if (!Array.isArray(courseImages)) return null;

              return (
                <Accordion
                  key={courseId}
                  sx={{
                    boxShadow: 'var(--box)',
                    border: 'thin solid',
                    borderColor: '#d3d5d7',
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <p className="text_3">
                      Hình ảnh khóa học: <span className="text_3_m">{courseId}</span>
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: '10px',
                      }}
                    >
                      {courseImages.map((src, imgIndex) => (
                        <Box
                          key={`${courseId}-${imgIndex}`}
                          sx={{
                            position: 'relative',
                            width: '100%',
                            paddingTop: '100%',
                          }}
                        >
                          <Image
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={src}
                            alt={`Hình ảnh ${imgIndex + 1} của khóa học ${courseId}`}
                            fill
                            style={{
                              objectFit: 'cover',
                              borderRadius: '3px',
                              cursor: 'pointer',
                            }}
                            onClick={() => saveImageIntro(src)}
                            onError={(e) => {
                              e.currentTarget.src = '/path/to/placeholder.jpg';
                            }}
                          />
                        </Box>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <p>Đang tải hình ảnh...</p>
          ) : <p>Không có hình ảnh</p>}
        </div>
      </Dialog>
    </>
  );
}

function SVG_image({ w, h }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="red">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.205 3h11.59c1.114 0 1.519.116 1.926.334.407.218.727.538.945.945.218.407.334.811.334 1.926v7.51l-4.391-4.053a1.5 1.5 0 0 0-2.265.27l-3.13 4.695-2.303-1.48a1.5 1.5 0 0 0-1.96.298L3.005 18.15A12.98 12.98 0 0 1 3 17.795V6.205c0-1.115.116-1.519.334-1.926.218-.407.538-.727.945-.945C4.686 3.116 5.09 3 6.205 3zm9.477 8.53L21 16.437v1.357c0 1.114-.116 1.519-.334 1.926a2.272 2.272 0 0 1-.945.945c-.407.218-.811.334-1.926.334H6.205c-1.115 0-1.519-.116-1.926-.334a2.305 2.305 0 0 1-.485-.345L8.2 15.067l2.346 1.508a1.5 1.5 0 0 0 2.059-.43l3.077-4.616zM7.988 6C6.878 6 6 6.832 6 7.988 6 9.145 6.879 10 7.988 10 9.121 10 10 9.145 10 7.988 10 6.832 9.121 6 7.988 6z"
        fill="#999999"
      />
    </svg>
  );
}
