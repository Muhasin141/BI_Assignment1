import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";

const Event = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-app-flax.vercel.app/"
  );
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

    return `${formattedDate} • ${formattedTime} IST`;
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // const filteredData = data
  //   ? data.filter((event) => {
  //       if (selectedType === "All") {
  //         return data;
  //       }

  //       return event.eventType === selectedType;
  //     })
  //   : [];

  const filteredData = data
    ? data.filter((event) => {
        const eventType = event.eventType || "";
        const typeMatch = selectedType === "All" || eventType === selectedType;

        if (!searchTerm) {
          return typeMatch;
        }

        const eventTitle = event.title || "";
        const eventDescription = event.description || "";
        const eventTags = event.eventTags || [];

        const titleMatch = eventTitle.includes(searchTerm);
        const descriptionMatch = eventDescription.includes(searchTerm);

        const tagsMatch = eventTags.some((tag) =>
          (tag || "").includes(searchTerm)
        );

        const searchMatch = titleMatch || descriptionMatch || tagsMatch;

        return typeMatch && searchMatch;
      })
    : [];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <div className="bg-body-secondary min-vh-100">
        <div class="container">
          <header>
            <nav class="navbar">
              <div>
                <a class="navbar-brand" href="#">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3992/3992650.png"
                    alt="Bootstrap"
                    width="100"
                    height="50"
                  />
                </a>
              </div>
              <div className="d-flex justify-content-end">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by title and tags"
                    aria-label="Search"
                    style={{ width: 150 }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </nav>
          </header>
          <main>
            <hr />

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Meetup Events</h1>

              <div className="dropdown">
                <button
                  className="btn btn-light text-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedType === "All" ? "Select Event Type" : selectedType}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={() => handleTypeChange("All")}
                    >
                      All Event
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={() => handleTypeChange("Online Event")}
                    >
                      Online Event
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={() => handleTypeChange("Offline Event")}
                    >
                      Offline Event
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              {loading && <p>loading.....</p>}
              {error && <p>Error...</p>}
              <div className="row g-4 ">
                {filteredData &&
                  filteredData.map((event) => (
                    <div className="col-md-4 px-5">
                      <div class="card mt-4" style={{ width: "20rem" }}>
                        <img
                          src={event.imageUrl}
                          class="card-img-top"
                          alt={event.title}
                        />
                        <span
                          className={`badge rounded-pill position-absolute m-2 top-0 start-0 z-10 
                              bg-light text-dark fw-bold shadow-sm`}
                        >
                          {event.eventType}
                        </span>

                        <div class="bg-body-secondary">
                          <small class=" card-text text-body-secondary">
                            {dateHandler(event.startDate)}
                          </small>

                          <Link
                            to={`/events/${event._id}`}
                            className="text-decoration-none text-dark d-block h-100"
                          >
                            <h4 className="">{event.title}</h4>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Event;
