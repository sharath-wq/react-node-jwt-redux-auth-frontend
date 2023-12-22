const Gradient = ({ color, positon }) => {
    return (
        <>
            <div className={`absolute -z-10 h-[50rem] w-[50rem] blur-[10rem] rounded-full ${color} ${positon}`}></div>
        </>
    );
};

export default Gradient;
