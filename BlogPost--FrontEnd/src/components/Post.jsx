import {Link} from 'react-router-dom'
const Post = ({post}) => {
  return (
    <>
    <div className="card mb-4">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      className="img-fluid h-100 card-img-top"
                      src={post.image}
                      alt="post"
                    />
                  </div>

                  <div className="col-md-8 card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">
                      {post.content.substr(0, 80)}...
                    </p>
                    <Link to={`/posts/${post._id}`} className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
    </>)}
export default Post