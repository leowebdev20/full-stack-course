import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = (props) => {
  return (
    <ul>
      {props.notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default ConnectedNotes;
