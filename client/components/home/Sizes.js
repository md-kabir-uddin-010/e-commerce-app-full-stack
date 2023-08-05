
export default function Sizes({data,selectedSize,setSelectedSize}) {
  let sizes = data.reduce((acc,curr)=>{
    acc = acc.concat(curr.avilable_sizes)
    return acc
  },[])
  let unicSizes = [...new Set(sizes)]

const handleSizes = size =>{
  if (selectedSize.includes(size)) {
    setSelectedSize((prev)=>(prev.filter(s => s !== size)))
  }else{
   setSelectedSize((prev)=>(prev.concat(size)))
  }
}

  return (
    <div>
      <p>Sizes</p>
      <div>
    {unicSizes && unicSizes.map(size=>(
          <button
          key={size}
          onClick={() => handleSizes(size)}
          type="button"
          className={`${selectedSize.includes(size) ? "bg-yellow-400" : "bg-gray-300"} m-1 w-12 h-12 rounded-full hover:border-2 hover:border-gray-600  dark:hover:border-gray-300 dark:text-black`}
        >
          {size}
        </button>
    ))}
      </div>
    </div>
  );
}
