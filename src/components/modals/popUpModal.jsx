import { React, useState } from 'react';

function PopUpModal({title, component}) {
  const [showForm, setShowForm] = useState(false);

    return (
        <div className="formParentContainer fixed top-0 left-0 bg-bgBlue z-[40] h-screen w-screen overflow-y-auto overflow-x-auto flex items-center justify-center">
        <div className="patientFormContainer relative bg-white w-[90%] lg:w-[45%] h-max px-[3.5%] py-[4%] rounded-md">
          <button
            className="close border-2 border-mainRed rounded-md px-2 text-mainRed absolute right-4 top-4"
            onClick={() => setShowForm(false)}
          >
            x
          </button>
          <h1 className="text-mainBlue font-semibold text-xl">{title}</h1>

          {component}

        </div>
      </div>
    );
}

export default PopUpModal;