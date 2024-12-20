import Image from "next/image";

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
};

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flexCenter p-2 hover:cursor-pointer"
    >
      <Image
        src={icon} 
        alt="icon" 
        width={32} 
        height={32} 
      />
    </button>
  );
};

export default IconButton;
