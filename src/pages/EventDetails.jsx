import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const dateHandler = (startDate) => {
    if (!startDate) return "Date TBD";

    const eventDate = new Date(startDate);

    const options = { timeZone: "Asia/Kolkata" };

    const dateOptions = {
      ...options,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    const timeOptions = {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = eventDate.toLocaleDateString("en-US", dateOptions);

    const formattedTime = eventDate.toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate} at ${formattedTime}`;
  };

  const { eventId } = useParams();
  const { data, loading, error } = useFetch(
    `https://meetup-app-flax.vercel.app/events/${eventId}`
  );

  return data ? (
    <div>
      <div className="bg-body-secondary min-vh-100">
        <div className="container">
          <header>
            <nav className="navbar">
              <div>
                <Link className="navbar-brand" to="/">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3992/3992650.png"
                    alt="Bootstrap"
                    width="100"
                    height="50"
                  />
                </Link>
              </div>
            </nav>
          </header>
          <hr />

       
          <div className="row">
            <div className="col-12 col-md-8">
              <h2>{data.title}</h2> <br />
              <p>
                Hosted By: <br />
                <b>{data.hostedBy}</b>
              </p>
              {/* Added `img-fluid` to make the image responsive and scale down on smaller screens */}
              <img
                src={data.imageUrl}
                alt={data.title}
                className="img-fluid"
                style={{ maxWidth: "100%", height: "auto" }} // Max width 100% for responsiveness
              />{" "}
              <br /> <br />
              <h3>Details:</h3>
              <p>{data.details}</p>
              <h3>Additional Information:</h3>
              <p>
                <b>Dress Code: </b>
                {data.additionalInfo.dressCode}
                <br />
                <b>Age Restrictions: </b>
                {data.additionalInfo.ageRestrictions}
              </p>
              <h3>Event Tags:</h3>
              <p>
               
                <div className="d-flex flex-wrap gap-2">
                  {data.eventTags.map((tag, index) => (
                    // Added a `key` for performance and to resolve a React warning
                    <div key={index} className="btn btn-danger">
                      {tag}
                    </div>
                  ))}
                </div>
              </p>
            </div>

            <div className="col-12 col-md-4">
             
              <div className="card shadow-sm border-0 mb-4 p-3 bg-white mt-3 mt-md-0">
                <div className="py-3 mx-3">
                  <small
                    className="fs-6 text-secondary"
                    style={{ fontSize: "0.8em", lineHeight: "1.1" }}
                  >
                    {dateHandler(data.startDate)} to {dateHandler(data.endData)}
                    <br />
                    <br />
                    Marketing City <br />
                    {data.location.name} {data.location.address}
                    <br />
                    <br />$ {data.price}{" "}
                  </small>
                </div>
              </div>

              
                <h3>Speakers:({data.speakers.length})</h3>

                <div>
                  <div className="row g-2">
                    {data.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="col-4 col-sm-3 col-md-6 col-lg-4"
                      >
                        <div
                          className="card text-center border p-2"
                          style={{ minHeight: "80px", minWidth: "unset" }}
                        >
                          <img
                            src={speaker.photo}
                            alt={speaker.name}
                            className="rounded-circle mb-1 shadow-sm mx-auto "
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="card-body p-1">
                            <span
                              className="d-block fw-bold mt-1"
                              style={{ fontSize: "0.8em" }}
                            >
                              {speaker.name}
                            </span>
                            <span
                              className="d-block text-muted"
                              style={{ fontSize: "0.7em", lineHeight: "1.1" }}
                            >
                              {speaker.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    loading && (
      <div className="bg-body-secondary min-vh-100">
        <div className="container">
          <header>
            <nav className="navbar">
              <div>
                <Link className="navbar-brand" to="/">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3992/3992650.png"
                    alt="Bootstrap"
                    width="100"
                    height="50"
                  />
                </Link>
              </div>
            </nav>
          </header>
          <hr />
          <p>Loading....</p>
        </div>
      </div>
    )
  );
};

export default EventDetails;

