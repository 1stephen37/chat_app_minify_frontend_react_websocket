import {Link} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";

function Home() {
    return (
        <MainLayout>
            <div>
                <h1 className="text-center text-3xl font-bold">Đây là trang chủ Chat app của Stephen Nguyễn</h1>
                <div className='w-max mx-auto flex gap-10 mt-10'>
                    <Link to='/messenger'>Ấn vào đây là nó hiện ra các đoạn chat</Link>
                    <Link to='/login'>Ấn vào đây để đăng nhập</Link>
                </div>
            </div>
        </MainLayout>
    );
}

export default Home;
