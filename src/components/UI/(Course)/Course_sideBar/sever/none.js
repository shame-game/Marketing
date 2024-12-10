import Image from "next/image"

export default function None() {
  return (
    <div style={{ height: "100%", flexDirection: 'column' }} className='flexCenter'>
      <h3 className='Title_Popup'>Không có thông tin để hiển thị</h3>
      <p style={{ color: 'red' }}>(Chỉ những khóa học do bạn chủ nhiệm mới được hiển thị)</p>
      <Image src='https://lh3.googleusercontent.com/d/1U-VnSQPNONUr2jwuxg2eR0s4I7dLsF6o' width={250} height={250} alt="none" />
    </div>
  )
}