import React, { useCallback } from "react";
import { Typography, useTheme } from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { IChannel } from "../utils/interfaces";
import { SearchResult } from "./styles";
import { useNavigate } from "react-router";

interface props {
  data: IChannel;
  input?: string;
}
const SearchResultBox = ({ data, input }: props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name, handle, created_at } = data;
  if (typeof input === "undefined") input = "";
  const matches = match(name, input, { insideWords: true });
  const parts = parse(name, matches);

  return (
    <SearchResult onClick={() => navigate(`/channel/${id}`)}>
      <Typography>
        {parts.map((p, i) => (
          <span
            key={i}
            style={{
              backgroundColor: p.highlight
                ? theme.palette.primary.light
                : "none",
            }}
          >
            {p.text}
          </span>
        ))}
      </Typography>
      {handle[0] === "@" && (
        <Typography
          sx={{
            fontSize: "0.5em",
            color: theme.palette.secondary.contrastText,
          }}
        >
          {handle}
        </Typography>
      )}
    </SearchResult>
  );
};

export default SearchResultBox;
