import ScaleLoader from "react-spinners/ScaleLoader";


const LoadingPage = (props) => {
    return (
        <div className="flex flex-col items-center text-[#040BC5] justify-center h-screen">
        <ScaleLoader width={20} color="#040BC5" />
        <h1 className="font-bold text-2xl mt-5">{props.content}</h1>
      </div>
    );
};

export default LoadingPage;