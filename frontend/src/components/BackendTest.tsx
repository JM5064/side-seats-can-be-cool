
const BackendTest = () => {
  const createCourse = async () => {
    console.log("Button clicked")

    const formData = new FormData();
    formData.append("title", "Test Course");
  
    const res = await fetch("http://127.0.0.1:5000/createclass", {
      method: "POST",
      body: formData,
      credentials: "include"
    });
  
    const data = await res.json();
    console.log(data);
  };

  return (
    <button 
      onClick={createCourse}
      className="border hover:cursor-pointer" 
    >
      Create course
    </button>
  )
    
}

export default BackendTest