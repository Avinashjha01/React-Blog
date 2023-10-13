 import {useState,useEffect,useRef,useReducer} from "react";


 function blogsReducer(state,action){
       switch(action.type){
        case "ADD":
           return [action.blog, ...state];
           case "REMOVE":
           return state.filter((blog,index)=>index !== action.index);
           default:
            return [];
       }
 }


//Blogging App using Hooks
 export default function Blog(){
      
      //   const[title,setTitle] = useState("");
    //   const[content,setContent]= useState("");
   const[formData,setFormData]=useState({title:"",content:""})
    //To Store title & content in array 
     //const[blogs,setBlogs]= useState([]); 

     //useReducer
       const[blogs,dispatch]= useReducer(blogsReducer,[]);
       const titleRef = useRef(null);  
     
      useEffect(()=>{
      titleRef.current.focus();
     },[]); // Equivalent to componentDidMount()

      useEffect(()=>{
         if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
         }
         else{
            document.title="React Blog"
         }
      },[blogs])

     //Passing the Synthetic event as arguement to stop refreshing the page on submit
      function handleSubmit(e){
         e.preventDefault();
        // setBlogs([{title:formData.title,content:formData.content},...blogs]); //Rest operator
          dispatch({type:"ADD",blog:{title:formData.title,content:formData.content}})
         //To remove the previous written cotent after adding
        //  setTitle("");
        //  setContent("");

        titleRef.current.focus();
        setFormData({title:"",content:""})
     }

       function removeBlog(i){
        //setBlogs(blogs.filter((blog,index)=>i!==index))
        dispatch({type:"REMOVE",index:i})
       }

    

     return(
        <>
        <h1>What's in Your Mind!</h1>
        
        <div className="section">
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                    <input className="input"
                      placeholder ="Enter the Title of the Blog here.."
                      value={formData.title} 
                       ref={titleRef}
                       required
                     onChange={(e)=>setFormData({title:e.target.value,content:formData.content})}/>
                </Row>
                <Row label="Content">
                    <input className="input content"
                    placeholder ="Content of the Blog goes here.."
                    value={formData.content} 
                    required
                    onChange={(e)=>setFormData({title:formData.title,content:e.target.value})}/>
                </Row>

                <button className="btn">ADD</button>
            </form>
        </div>
        
        <hr/>

         {/* Section where submitted blogs will be displayed */}
         <h2>Blogs</h2>
         {blogs.map((blog,i)=>(
            <div  className="blog"key={i}>
               <h3>{blog.title}</h3>
               <p>{blog.content}</p>
               <div className="blog-btn">
                <button 
                onClick={()=>removeBlog(i)}
                className="btn remove">Delete</button>

              </div>
            </div>
         ))}        

         </>
     )
 }

//Row component to introduce a new row section in the form
 function Row(props){
     const{label}= props;
     return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr/>
        </>
     )
 }