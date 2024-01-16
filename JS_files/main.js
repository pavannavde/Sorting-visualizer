const BarsDiv = document.getElementById('bars')

//buttons
const RandomizeArraybtn = document.getElementById('R_Array')
const BSortbtn= document.getElementById('B_sort')
const ISortbtn= document.getElementById('I_sort')
const SelSortbtn = document.getElementById('Sl_sort')
const QSortbtn = document.getElementById('Q_sort')
const ShellSortbtn = document.getElementById('S_sort')
const ChangeSizebtn = document.getElementById('Change_sizebtn')
//create Array of Random no.
let Random_Array =[]
function CreateArray(){
    Random_Array=[]
   for(let i=0;i<20;i++){
    //creating Array
    Random_Array.push(Math.floor(Math.random()*20)+1) 
   }   
}
CreateArray();

//creating bars
function CreateBars(){
    BarsDiv.innerHTML='';
    Random_Array.forEach((x,i)=>{
    const height=x*10;
    const bar = document.createElement('div');
     bar.setAttribute('id',`A`+i)
     bar.innerText=`${height/10}`
    bar.style.height =`${height}px`;
    BarsDiv.appendChild(bar);
})}
CreateBars()

//randomize array button function
RandomizeArraybtn.addEventListener('click',()=>{
    CreateArray()
    CreateBars()
})

//Bubble sorting 
BSortbtn.addEventListener('click',async()=>{
    for(let i=0; i<20;i++)
    {
        for(let j=0;j<20-i-1;j++)
        {    
           const id1 = 'A'+j;
           const  id2 ='A'+(j+1);
           //higlight the current elements 
            Hilighter(id1,id2,true);
            //delay
            await DelayFunc(1000)
            if(Random_Array[j]>Random_Array[j+1])
            {
                //Swaping the element
                const temp = Random_Array[j];
                Random_Array[j] =Random_Array[j+1];
                Random_Array[j+1]=temp;
              
                //swaping the height
                SwapHeight(j,j+1)
                
            }
            //reser the default color
            Hilighter(id1,id2,false);
          
        }
        
    }
})

//Insertion sort sorting
ISortbtn.addEventListener('click',async()=>{

    for(let i=1;i<20;i++)
    {
    
        for(let j=i-1;j>=0;j--)
        {
            const id1 = 'A'+j;
            const  id2 ='A'+(j+1);
           //higlight the current elements 
            Hilighter(id1,id2,true);
            //delay
            await DelayFunc(500)
            if(Random_Array[j]>Random_Array[j+1]){
                const temp = Random_Array[j];
                Random_Array[j]=Random_Array[j+1];
                Random_Array[j+1]=temp;

                SwapHeight(j,j+1)
            }
            else
            {
            Hilighter(id1,id2,false);
                break;
            }
            Hilighter(id1,id2,false);
        }
        
    }

})

// Selection sort
SelSortbtn.addEventListener('click',async()=>{

    // One by one move boundary of unsorted subarray 
    for (let i = 0; i < 20-1; i++) 
    { 
        // Find the minimum element in unsorted array 
        let min_idx = i; 

        for (let j = i+1; j < 20; j++) 
        {
            if (Random_Array[j] < Random_Array[min_idx]) {
                min_idx = j; 

            }

        }
        // Swap the found minimum element with the first 
        // element 
        Hilighter('A'+min_idx,'A'+i,true);
        await DelayFunc(1000)
        let temp = Random_Array[min_idx]; 
        Random_Array[min_idx] = Random_Array[i]; 
        Random_Array[i] = temp; 
        SwapHeight(min_idx,i)
        Hilighter('A'+min_idx,'A'+i,false)

    } 
} 
)

//shell sort
 ShellSortbtn.addEventListener('click',async()=> {

    for (let gap = Math.floor(20 / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < 20; i++) {
            const temp = Random_Array[i];
            let j = i;

            while (j >= gap && Random_Array[j - gap] > temp) {
                Random_Array[j] = Random_Array[j - gap];
                j -= gap;
                CreateBars()
                Hilighter('A'+j,'A'+i,true)
                await DelayFunc(500)
            }

            Random_Array[j] = temp;
            Hilighter('A'+j,'A'+i,false)

        }
    }
})
// quick sort
QSortbtn.addEventListener('click',()=>quickSort(Random_Array,0,20-1))
// Function to perform Quick Sort and update the visualization
async function quickSort(array, start, end) {
    if (start >= end) return;
    const pivotIndex = await partition(array, start, end);

    await Promise.all([
      quickSort(array, start, pivotIndex - 1),
      quickSort(array, pivotIndex + 1, end)
    ]);
  }

  // Function to partition the array for Quick Sort
  async function partition(array, start, end) {
    const pivotValue = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      if (array[i] < pivotValue) {
        await swap(array, i, pivotIndex);
        pivotIndex++;
      }
    }
    await swap(array, pivotIndex, end);
    return pivotIndex;
  }

  // Function to swap two elements in the array and update the visualization
  async function swap(array, i, j) {
    Hilighter('A'+i,'A'+j,true);
    await DelayFunc(1000); // Delay for visualization
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
     SwapHeight(i,j)
     Hilighter('A'+i,'A'+j,false)

    // displayArray(array); // Update the visualization
  }

// change size function
let isLarge=true;
ChangeSizebtn.addEventListener('click',()=>{
    if(isLarge){
    Random_Array.forEach((x,i)=>{
        const bar = document.getElementById('A'+i)
        bar.style.width='8px'
        bar.style.fontSize='12px'
    })
    BarsDiv.style.gap='5px'
    isLarge=false;
   }
   else{
    Random_Array.forEach((x,i)=>{
        const bar = document.getElementById('A'+i)
        bar.style.width='20px'
        bar.style.fontSize='16px'

    })
    BarsDiv.style.gap='10px'
    isLarge=true;
   }
})

//delay for better animation 
function DelayFunc(time){
    return new Promise((resolve,reject)=>setTimeout(resolve,time))
}

// swaping heights
function SwapHeight(index1,index2){
 const Id1 = 'A'+index1;
 const Id2  ='A'+index2;

 const ele1 =document.getElementById(Id1);
 const ele2 =document.getElementById(Id2);



 const height1 = ele1.style.height;
 const height2 = ele2.style.height;
 
 const text1 = ele1.innerText;
 const text2 = ele2.innerText;

 ele1.style.height=height2;
 ele2.style.height=height1;

 ele1.innerText=text2;
 ele2.innerText=text1;

//  ele1.style.backgroundColor='rgb(0,255,64)';
//  ele1.style.backgroundColor='rgb(0,255,64)';

}

// hilights the function while comparing
 function Hilighter(id1,id2,IsHilight){
    if(IsHilight)
     {
        document.getElementById(id1).style.backgroundColor='red';
        document.getElementById(id2).style.backgroundColor='red';
    }
    else {
        document.getElementById(id1).style.backgroundColor='rgb(0,255,64)';
        document.getElementById(id2).style.backgroundColor='rgb(0,255,64)';
    }
 }