import PacmanLoader from "react-spinners/ClipLoader";


const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="#040BC" size={150} />
      </div>
    );
};

export default LoadingPage;