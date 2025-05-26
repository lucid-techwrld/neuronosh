import icon from '../assets/icon.png'

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-[100vh] text-lg relative">
      <h1 className="text-4xl font-extrabold font-sans text-center absolute top-10 text-amber-500">WELCOME TO CHEF CLAUDE</h1>
      <img src={icon} alt="icon" className="updown w-[120px] h-[140px] mb-5" />
    <div className="progress mb-5"></div>
    <p>
      Let's get you started...
    </p>
    <p>
      Cooking with ChefClaude...👨‍🍳
    </p>
  </div>
)
}

export default Loader;