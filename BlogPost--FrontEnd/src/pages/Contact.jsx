import React from 'react'

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    
    <div className="container py-3">
       <h3 className='text-center'>Demo</h3>
      <h1 className="text-center mb-4">Contact Me</h1>

      <div className="row justify-content-center">

        <div className="col-lg-6">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Enter your name"/>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email"/>
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="4" placeholder="Write your message"></textarea>
            </div>

            <button className="btn btn-primary w-100">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>

  )
}

export default Contact
