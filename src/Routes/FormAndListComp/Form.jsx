import React from 'react'
import toast from 'react-hot-toast';
// import image2 from "../../images/image2.png"
import { useForm } from 'react-hook-form';
import { setDataLocalStorage } from '../../Redux_Toolkit/getDataSlice';
import { useDispatch } from 'react-redux';

const Form = () => {
  const generateUniqueId = (min, max) => {
    min = Math.ceil(min); // Round up to the nearest integer
    max = Math.floor(max); // Round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const dispatch = useDispatch()
    const { register, handleSubmit , reset , formState: { errors } } = useForm({
        defaultValues: {
          status: 'Pending', // Set the default value for the select dropdown
        },
      });
      const onSubmit = (data) => {
        const id = generateUniqueId(100000,99999999);
        // console.log(id)
        const addId = {
          ...data,
          id
        }
        // console.log(addId);
        dispatch(setDataLocalStorage(addId))
        reset({
          title:"",
          description: "",
          status:"Pending"
        })
        toast.success("Todo Added Successfully !")
      };
  return (
    <>
    <section className='md:w-[33%] w-full '  >
        <div className="main w-full ">
            <div className="first md:w-full my-5 ">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full  flex flex-col '>
                    <input
  type="text" 
  {...register('title', {
    required: "Title is required",
    validate: (value) => {
      const length = value.length;
      return (length > 4 && length <=10) || "Title must be between 5 and 25 characters";
    },
  })}
  className='rounded-lg outline-purple-500 text-xl mx-4 border-2 py-2 px-1'
  name="title"
  id="title"
  placeholder='Enter your title '
/>
{errors?.title && <span className="text-red-500 flex justify-center ">{errors.title.message}</span>}
<textarea
  {...register('description', {
    required: "Description is required",
    validate: (value) => {
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount > 3 || "Description must be greater than 3 words";
    },
  })}
  rows={7}
  spellCheck={true}
  className='rounded-lg text-lg outline-purple-500 border-2 py-2 px-1 my-3 mx-4 font-mono'
  name="description"
  id="description"
  placeholder='Enter description'
/>
{errors?.description && <span className="text-red-500 flex justify-center ">{errors.description.message}</span>}
                    <select disabled
        name="status"
        id="status"
        className="rounded-lg cursor-not-allowed text-lg border-2 py-2 px-1 my-3 mx-4 font-mono"
        {...register('status')}
      >
     <option className='bg-white text-purple-700  ' value="Pending">Pending</option>
   
      </select>
                    <button type="button " className='text-purple-200 mx-6 rounded-lg py-2 text-2xl hover:bg-purple-600 font-semibold bg-purple-800' >
                        Save
                    </button>
                    </form>
            </div>
           
        </div>
    </section>
    </>
  )
}

export default Form