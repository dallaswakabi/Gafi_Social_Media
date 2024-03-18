import React,{useState}from "react";
import { Modal } from "@mantine/core";
const ProfileModel = ({ modelOpened, setModelOpened,data}) => {
 
  const {password,...other} = data
  const [FormData,setFormData] = useState(other)

  const handleChange = (e)=>{
     e.preventDefault()
     setFormData({...setFormData,[e.target.name]:e.target.value})
  }

 
  const handleSubmit = async(e)=>{
     e.preventDefault();
     
  }

  return (
    <Modal
      title="Profile"
      size="55%"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={FormData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={FormData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name=" worksAt                                            "
            placeholder="Works at"
            onChange={handleChange}
            value={FormData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange={handleChange}
            value={FormData.livesIn}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={FormData.country}
          />
        </div>
        <div>
          <input 
          type="text" 
          className="infoInput"
           name="relationship"
          placeholder="RelationShip Status"
          onChange={handleChange}
          value={FormData.relationship}
           />
        </div>
        <div>
            Profile Image
            <input type="file" name="profilePicture"/>
            Cover Image
            <input type="file" name="coverPicture"/>
        </div>
        ,<button className="button infoButton" type="submit">Update</button>
      </form>
    </Modal>
  );
};

export default ProfileModel;
