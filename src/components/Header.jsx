import Icon from "../assets/icon.png"

const Header = () => {
  return (
    <>
      <header className="bg-amber-600 w-full h-18 flex justify-between px-4 py-2 items-center">
        <h2 className="font-knewave font-bold text-3xl">Chef Claude</h2>
        <img src={Icon} alt="chef-claude-icon" className="w-[60px] h-[60px]" />
      </header>
    </>
  )
}

export default Header;