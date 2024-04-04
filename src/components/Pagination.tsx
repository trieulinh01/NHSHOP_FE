import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

type PaginationProps = {
    totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
    const [params] = useSearchParams();
    const page = parseInt(params.get("page") || "1"); 
    const navigate = useNavigate();

    const paginationStyle = {
        marginBottom: "85px",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    };

    const handleNext = () => {
        if (page < totalPages) {
            navigate(`?page=${page + 1}`);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            navigate(`?page=${page - 1}`);
        }
    };

    const nextPrevBtnStyle = {
        cursor: "pointer",
        backgroundColor: "#F9F1E7",
        height: "60px",
        borderRadius: "10px",
        border: "none",
        display: "flex",
        justifyContent: "center", // Căn giữa văn bản
        alignItems: "center",
        padding: "15px 15px",
    };

    const pageItemStyle = {
        width: "60px",
        height: "60px",
        backgroundColor: "#F9F1E7",
        margin: "0 5px",
        cursor: "pointer",
        borderRadius: "10px",
        color: "#000",
        fontSize: "20px",
        fontWeight: "400",
        display: "flex",
        justifyContent: "center", // Căn giữa văn bản
        alignItems: "center",
    };

    const pageLinkStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        textDecoration: "none",
        color: "#000",
    };

    return (
        <div className="pagination" style={paginationStyle}>
            <div style={nextPrevBtnStyle} onClick={handlePrev}>
                Pre
            </div>
            {Array.from({ length: totalPages }, (_, i) => (
                <Link
                    key={i + 1}
                    to={`?page=${i + 1}`}
                    style={{
                        ...pageItemStyle,
                        padding: "15px 25px",
                        background: i + 1 === page ? "#B88E2F" : "#F9F1E7",
                    }}
                >
                    {i + 1}
                </Link>
            ))}
            <div style={nextPrevBtnStyle} onClick={handleNext}>
                Next
            </div>
        </div>
    );
};

export default Pagination;
