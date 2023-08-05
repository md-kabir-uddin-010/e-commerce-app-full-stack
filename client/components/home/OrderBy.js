import React from "react";

export default function OrderBy({selecteOrderBy,setSelecteOrderBy}) {
  return <div className=" flex justify-center items-center">
 <div className=" mr-2">OrderBy</div>
<div>
<select value={selecteOrderBy} onChange={(e)=>setSelecteOrderBy(e.target.value)} className=" border-2 border-black rounded-md dark:border-gray-300 dark:on-dark outline-none">
      <option value="" >Select</option>
      <option value="lowest">Low To High</option>
      <option value="highest">High To Low</option>
    </select>
</div>
  </div>;
}
