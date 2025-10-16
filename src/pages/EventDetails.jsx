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
            <nav class="navbar">
              <div>
                <Link class="navbar-brand" to="/">
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
            <div className="col-md-8">
              <h2>{data.title}</h2> <br />
              <p>
                Hosted By: <br />
                <b>{data.hostedBy}</b>
              </p>
              <img
                src={data.imageUrl}
                alt={data.title}
                style={{ width: "20rem" }}
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
                {data.eventTags.map((tags) => (
                  <>
                    <div className="btn btn-danger">{tags}</div> &nbsp;{" "}
                  </>
                ))}
              </p>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 mb-4 p-3 bg-white">
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

              <h3>Speakers:&#40;{data.speakers.length}&#41;</h3>

              <div>
                <div className=" row d-flex flex-wrap justify-content-start gap-3">
                  {data.speakers.map((speaker) => (
                    <div className="col">
                      <div
                        className="card text-center border p-2"
                        style={{ minHeight: "80", minWidth: "100px" }}
                      >
                        <img
                          src={speaker.photo}
                          alt={speaker.name}
                          className="rounded-circle mb-1 shadow-sm mx-auto "
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="card-body">
                          <span
                            className="d-block fw-bold mt-1"
                            style={{ fontSize: "0.9em" }}
                          >
                            {speaker.name}
                          </span>
                          <span
                            className="d-block text-muted"
                            style={{ fontSize: "0.8em", lineHeight: "1.1" }}
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
    loading && <p>Loading.....</p>
  );
};

export default EventDetails;
