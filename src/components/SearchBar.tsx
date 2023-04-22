import React, { useEffect, useMemo, useState } from "react";
import { Autocomplete, Typography, Skeleton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { orange } from "@mui/material/colors";

import { IChannel } from "../utils/interfaces";
import { mainFetcher } from "../utils/fetchers";
import StyledInput from "./StyledInput";

const SearchBar = (props: { closeModal?: () => void; autoFocus?: boolean }) => {
  const [value, setValue] = useState<IChannel | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<IChannel[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const fetch = useMemo(
    () =>
      _.debounce(
        (
          param: string,
          callback: (results: IChannel[] | undefined) => void
        ) => {
          mainFetcher(`/search/?search=${param}`)
            .then((res) => {
              callback(res);
            })
            .catch();
        },
        700
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      setLoading(false);
      return undefined;
    }
    setLoading(true);

    fetch(inputValue, (results?: IChannel[]) => {
      if (active) {
        let newOptions: IChannel[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="channel-search-bar"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      filterOptions={(x) => x}
      options={options}
      includeInputInList
      filterSelectedOptions
      value={value}
      onSubmit={(event) => {
        event.preventDefault();
      }}
      loading={loading}
      loadingText={
        <Skeleton sx={{ fontSize: "1em" }} width={200} variant="text" />
      }
      noOptionsText="일치하는 채널이 없습니다."
      onChange={(event: any, newValue: IChannel | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if (newValue) {
          navigate(`/channel/${newValue.id}`);
          props.closeModal && props.closeModal();
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <StyledInput
          inputProps={params.inputProps}
          InputProps={params.InputProps.ref}
          autoFocus={props.autoFocus}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);
        return (
          <li {...props} key={_.uniqueId("option")}>
            <Typography
              variant="body2"
              sx={{ color: "inherit", width: "100%", wordWrap: "break-word" }}
            >
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: part.highlight
                      ? orange[theme.palette.mode === "light" ? 200 : 900]
                      : undefined,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </Typography>
          </li>
        );
      }}
    />
  );
};

export default SearchBar;
