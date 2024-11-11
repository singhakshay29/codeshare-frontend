import Editor from '@monaco-editor/react';
import EditorLanguages from './EditorLang';
import {useEffect, useState} from 'react';
import EditorTheme from './EditorTheme';
import {DefaultCode} from './defaultCode';
import {useNavigate,useParams} from 'react-router-dom';
import { FaCopy } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';
const Server_Url='https://codeshare-live.vercel.app';



export default function MonacoEditor() {
    const {codeId}=useParams();
    const navigate = useNavigate();
    const [language,setLanguage]=useState("html");
    const [theme,setTheme]=useState("light");
    const [shareDisable, setShareDisable] = useState(false);
    const [sampleCode,setSampleCode]=useState(DefaultCode);
    
    const handleChangeLanguage=(newLanguage)=>{
        setLanguage(newLanguage);
    }
    
    const handleCodeChange = (newLanguage)=>{
      if (shareDisable) {
        setShareDisable(false);
      }
      setSampleCode({
        ...sampleCode,
        [language]:newLanguage,
      })
    }
    const handleChangeTheme=(newTheme)=>{
        setTheme(newTheme);
    }
    function handleCopy(){
      const {href} = location;
      navigator.clipboard.writeText(href).then(() => toast('Link Copied Successfully'));
    }
    const saveCode = async()=>{
      try{
        const {data}=await axios.post(`${Server_Url}/savecode`,sampleCode);
        toast.success("Your code has been save, copy the link below to share");
        navigate(`/${data.data.code_id}`);
        setShareDisable(true);
        console.log(data);
      }catch(error){
        console.log("Failed to share code", error);
        toast.error("Failed to share your code");
      }
    }
    const updateCode = async() =>{
      try{
        await axios.put(`${Server_Url}/updatecode/${codeId}`,sampleCode);
        toast.success("Your code updated successfully, copy the url to share");
      }catch(error){
        console.log("Failed to update code", error);
      toast.error("Failed to update your code");
      }
    }
    const handleShare =()=>{
      if(codeId){
        updateCode();
      }else{
        saveCode();
      }
    }
    useEffect(()=>{
      const getCode = async() =>{
        try{
          const {data}=await axios.get(`${Server_Url}/getcode/${codeId}`);
          setSampleCode({
            html: data.data.html,
            css: data.data.css,
            javascript: data.data.javascript,
          });
          setShareDisable(true);
        }catch(error){
          console.log("Error while getting code", error);
          toast.error("Failed to get code, Please check your url");
        }
      }
      if(codeId){
        getCode();
      }

    },[])
    
  return (
    <div
      className={`w-[90vw] lg:w-[880px] p-4 rounded-xl shadow-2xl ${
        theme === "light" ? "bg-white" : "bg-[#1e1e1e]"
      }`}>
        <Editor height="70vh" width="100%" theme={theme} language={language} value={sampleCode[language]} onChange={handleCodeChange} options={{fontFamily:"Outfit",fontWeight:500,formatOnPaste:true,formatOnType:true}} />
        <div className='pt-2 flex justify-between'>
          <div className='flex'>
            <EditorLanguages language={language} handleLanguage={handleChangeLanguage}/>
            <EditorTheme theme={theme} handleTheme={handleChangeTheme}/>
          </div>
            <div className='flex'>
            {codeId?.length >0 &&  
            <button className="p-2 ml-2 w-30 outline-none focus:ring-2 focus:ring-blue-500 bg-[#CED6E1] text-black text-sm rounded-lg" onClick={handleCopy}>
              <p className="text-black flex gap-2 font-semibold "> <FaCopy  className=' text-lg'/>Copy Url</p></button>}
          <button className="p-2 ml-2 w-30 flex gap-2 outline-none focus:ring-2 font-semibold focus:ring-blue-500 bg-blue-500 text-black text-sm rounded-lg"  disabled={shareDisable} onClick={()=>handleShare()}><FaShareAlt className='text-lg' /> Share</button>
            </div>
        </div>
    </div>
  )
}
