import React, { useEffect } from "react";
const BASE_URL = 'https://cloud.leonardo.ai/api/rest/v1/generations/';
let genId;


function TextToImg() {

  const postIdea = async (data) => {
    console.log("post idea")
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${import.meta.env.VITE_APP_API_URL}`,
      },
      body: JSON.stringify({
        prompt: data.prompt,
        modelId: '291be633-cb24-434f-898f-e662799936ad', //Changed to Leonardo Signature model
        width: 312,
        height: 312,
        sd_version: 'v2',
        num_images: 1,
        guidance_scale: 7,
        presetStyle: 'LEONARDO'
      }),
    });
  
    const results = await response.json();
    console.log(results)
    genId = results.sdGenerationJob.generationId;
    return genId;
  };
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer 4fa90a87-7907-4a80-954d-90198e253bc3`,
    },
  };
  
  function print(url) {
    console.log("function print")
    // const container = document.querySelector('.img-container');
    // container.innerHTML = '';
    // const generatedImg = document.createElement('img');
    let imgcontainer = document.querySelector(".img-container")
    imgcontainer.src = url
    // const generatedAudio = document.createElement('audio');
    // console.log(postText(url));
    // generatedImg.classList = 'generated-img';
    // container.appendChild(generatedImg);
    // container.appendChild(generatedAudio);
  }
  
  async function fetchFinalimg(url) {
    console.log("fetch final im")
    const interval = setInterval(async () => {
      const response = await fetch(url, options);
      const results = await response.json();
      const { status } = results.generations_by_pk;
  
      if (status !== 'PENDING') {
        clearInterval(interval);
        const resultURL = results.generations_by_pk.generated_images[0].url;
        console.log("got the final url")
        print(resultURL);
      }
    }, 5000);
  }


  useEffect(()=>{
    const form = document.getElementById('list-form');
  const formInput = document.getElementById('name');
  form.addEventListener('submit', async (event) => {
    console.log("prevent default")
    event.preventDefault();
    const newName = formInput.value;
    const newImg = {
      prompt: newName    
    };
    console.log(newImg)
    formInput.value = '';
    // const genId = await postIdea(newImg); // Wait for the postIdea function to complete
    const genId = await postIdea(newImg); // Wait for the postIdea function to complete
    const URLL = `${BASE_URL}${genId}`;
    
    fetchFinalimg(URLL);
  });
  },[])
  
  
  

  return (
    <div className="chec">
      <div className="container">
        <span className="text-center">
        <h2 className="text-center py-2 fw-bold" id="typewriter">
          Tell me what you want me to draw...
        </h2>

        </span>

        <div>
          
        </div>

        <form action="" className="py-5 d-flex " id="list-form" >
          <input type="text" name="" className="form-control" id="name" autoComplete="false" placeholder="A dog dancing breakdance"/>
          <button type="submit" className="btn btn-dark" >Run</button>
        </form>

        <div className="py-5 d-flex align-items-center justify-content-center " >
          <div
            id="circle"
            className="d-flex align-items-center justify-content-center shadow "
            style={{maxWidth:"350px"}}
            
          >
            <img
              src="https://picsum.photo/300"              
              className="rounded rounded-circle img-container"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToImg;
