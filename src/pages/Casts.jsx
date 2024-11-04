import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CastCard from "../components/CastCard";
import BackButton from "../components/BackButton";
import { TfiReload } from "react-icons/tfi";

const Casts = () => {
  const [credits, setCredits] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const { mediaType, id } = useParams();

  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${apiKey}`
      )
      .then((response) => {
        setCredits(response.data.cast || [])
        setLoading(false)
    }) // Ensure it's always an array
      .catch((error) => console.error(error));
  }, [mediaType, id, apiKey]);
  return (
    <section>
        {loading ? (
            <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[50vh]">
            <TfiReload className="text-green-500 text-4xl animate-spin" />
            Loading.... Please wait
          </div>
        ): (
            <>
            <BackButton />
            <div className="flex gap-4 mt-4 flex-wrap w-full">
              {credits.length > 0 ? (
                credits.map((member) => <CastCard member={member} key={member.id} />)
              ) : (
                <p>No cast information available.</p>
              )}
            </div>
            </>
        )}
    </section>
  );
};

export default Casts;
