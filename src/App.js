import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      // onClick={onClickHandler(index)}
      // Here onClickHandler should be a function
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  // const [setSelectedIndex,selectedIndex] = useState();
  // setSelectedIndex and selectedIndex should be swapped.
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(true);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
    //console.log(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          // isSelected={selectedIndex}
          //isSelected should be Boolean Variable
          isSelected={Boolean(selectedIndex)}
          //giving unique key to list item is missing
          key={index}
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  // items: PropTypes.array(
  //   PropTypes.shapeOf({
    //It is a Syntax error
    //array should be arrayOf & shapeOf should be shape
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: [
    { text: "Aayush", index: false },
    { text: "Maheshwari", index: false },
  ],
};

const List = memo(WrappedListComponent);

export default List;
