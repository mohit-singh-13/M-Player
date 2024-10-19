import { useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "./Card";
import { Song } from "../context/AppContext";

const Cards = ({ allSongs }: { allSongs: Song[] }) => {

  function Items({ currentItems }: { currentItems: Song[] }) {
    return (
      <div className="flex flex-wrap gap-10 justify-center mt-8">
        {currentItems.map((item, index) => (
          <Card song={item} key={index} />
        ))}
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = allSongs.slice(itemOffset, endOffset);

    const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % allSongs.length;

      setItemOffset(newOffset);
      window.scrollTo(0, 0);
    };

    return (
      <div className="flex flex-col gap-[2rem]">
        <Items currentItems={currentItems} />

        <div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(allSongs.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-4"}
            pageClassName={"mx-1"}
            pageLinkClassName={"px-3 py-2 border rounded-md hover:bg-gray-200"}
            previousClassName={"mx-1"}
            previousLinkClassName={
              "px-3 py-2 border rounded-md hover:bg-gray-200"
            }
            nextClassName={"mx-1"}
            nextLinkClassName={"px-3 py-2 border rounded-md hover:bg-gray-200"}
            breakClassName={"mx-1"}
            breakLinkClassName={"px-3 py-2 border rounded-md"}
            activeClassName={"bg-[#005D6C] text-white"}
            activeLinkClassName={"px-3 py-2 border rounded-md"}
            className="flex justify-center gap-3 py-8"
          />
        </div>
      </div>
    );
  }

  return <PaginatedItems itemsPerPage={25} />;
};

export default Cards;
