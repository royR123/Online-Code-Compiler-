import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleGuestUser = () => {
        navigate('/editor/guest');
    }
    return (
        <div>
            Home
            <button onClick = {handleGuestUser} >Guest User</button>
        </div>
    );
}
export default Home;