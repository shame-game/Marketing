
'use client'

import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField';
import { useStudentContext } from '@/context/student'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import fetchApi from '@/utils/API_suport/fetchData';

export default function CheckPay({ data, nameCourse, name, bt }) {
  const { dataStudent, updateStudent } = useStudentContext();
  const [value, setvalue] = useState(new Intl.NumberFormat('de-DE').format(data.StatusPay) + ' vnđ')
  const [open, setOpen] = useState(false);
  const [finalamount, setfinalamount] = useState(value)
  const [vc, setvs] = useState(0)
  const [methodpay, setmethodpay] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const voucher_s = (val) => {
    if (val) {
      setvs(val)
      setfinalamount(new Intl.NumberFormat('de-DE').format(data.StatusPay - (data.StatusPay * Number(val.slice(0, -1)) / 100)) + ' vnđ')
    } else {
      setvs(0)
      setfinalamount(value)
    }
  }

  const save = async () => {
    setIsLoading(true)
    try {
      let data = await fetchApi('/Student_Tuition/c_Bill', {
        method: 'POST',
        body: JSON.stringify({
          _id: name._id, StudentID: name.ID, CourseID: nameCourse, Amount_due: Number(value.slice(0, -4).replace(/\./g, "")),
          Amount_paid: Number(finalamount.slice(0, -4).replace(/\./g, "")), Discount: vc, Payment_method: methodpay
        })
      });
      console.log(data);
      const updatedStudents = dataStudent.map(student => student._id === data._id ? data : student);
      updateStudent(updatedStudents);
      setOpen(false)
    } catch (error) {
      console.error("Error saving bill:", error);
    }
    setIsLoading(false)
  }

  return (
    <>
      <div onClick={handleClickOpen}>{bt} </div>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        onClose={handleClose}
        open={open}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', padding: '0 16px',
          alignItems: 'center', borderBottom: 'thin solid var(--background_1)'
        }}>
          <p className='text_3'>Xác nhận học phí</p>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ color: 'var(--icon_1)', my: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div style={{ padding: '12px 24px' }}>
          <p className='text_3_m' style={{ padding: '6px 0' }}>Tên khóa học: <strong>{nameCourse}</strong></p>
          <p className='text_3_m' style={{ padding: '6px 0' }}>Tên học sinh: <strong>{name.Name}</strong></p>
          <p className='text_3_m' style={{ padding: '6px 0' }}>Học phí: <strong>{value}</strong></p>
          <p className='text_3_m' style={{ padding: '6px 0' }}>Học phí đã thu (sau giảm): <strong>{finalamount}</strong></p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'end' }}>
            <p className='text_3_m' style={{ marginBottom: 5 }}>Mã giảm học phí:</p>
            <Autocomplete
              size='small' options={voucher}
              getOptionLabel={(option) => option} sx={{ flex: 1 }}
              onChange={(e, value) => voucher_s(value)}
              renderInput={(params) => <TextField variant="standard" {...params} label="Giá trị giảm học phí" />}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'end' }}>
            <p className='text_3_m' style={{ marginBottom: 5 }}>Phương thức thanh toán:</p>
            <Autocomplete
              size='small' options={['Chuyển khoản', 'Tiền mặt']}
              getOptionLabel={(option) => option} sx={{ flex: 1 }}
              onChange={(e, value) => {
                if (value == 'Chuyển khoản') setmethodpay(1)
                else setmethodpay(0)
              }}
              renderInput={(params) => <TextField variant="standard" {...params} label="Chọn phương thức đã thanh toán" />}
            />
          </div>
          { /*<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <p className='text_3_m'>Mã giảm học phí:</p>
            <Input placeholder="Nhập voucher" inputProps={{ 'aria-label': 'description' }} sx={{ ml: 1, flex: 1 }} />
          </div> */}

        </div>
        <DialogActions sx={{ borderTop: 'thin solid var(--background_1)' }}>
          <Button onClick={handleClose}> Thoát </Button>
          <Button onClick={save}> Xác nhận </Button>
        </DialogActions>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog >
    </>
  );
}

const voucher = [
  '5%', '10%', '15%', '50%', '100%'
]