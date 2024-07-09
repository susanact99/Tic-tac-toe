const Square = ({children, isSelected, updateBoard, index}) => {

    const handleClick =()=>{
      updateBoard(index)}
  
    const className = `square ${isSelected?'is-selected':''}`
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
  };
  export default Square