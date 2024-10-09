import { useState, useEffect, useRef } from "react";
import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  DialogTitle,
  Select,
  FormControl,
  MenuItem,
  Divider,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers";
const Checklist = () => {
  // console.log("value", value);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [savedCategories, setSavedCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [checked, setChecked] = useState();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeDialogIndex, setActiveDialogIndex] = useState(null);
  const [checklistindex, setChecklistIndex] = useState(null);
  const descriptionRef = useRef(null);
  const [formData, setFormData] = useState({
    category: "",
    checklist: {
      note: "",
      description: "",
      details: "",
      date: null,
      assigment: null,
    },
  });

  // console.log("XS", formData.category.date);

  const [assigment, setAssigment] = useState(null);
  const [hoveredChecklist, setHoveredChecklist] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (categoryIndex, checklistIndex) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [categoryIndex]: {
        ...prevCheckedItems[categoryIndex],
        [checklistIndex]: !prevCheckedItems[categoryIndex]?.[checklistIndex],
      },
    }));
  };

  const isChecked = (categoryIndex, checklistIndex) => {
    return checkedItems[categoryIndex]?.[checklistIndex] || false;
  };
  const handleMouseEnter = (categoryIndex, checklistIndex) => {
    setHoveredChecklist((prev) => ({
      ...prev,
      [categoryIndex]: checklistIndex,
    }));
  };
  const handleChange = (event) => {
    setAssigment(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      checklist: {
        ...prevState.checklist,
        assigment: event.target.value,
      },
    }));
  };
  const handleMouseLeave = (categoryIndex) => {
    setHoveredChecklist((prev) => ({
      ...prev,
      [categoryIndex]: null,
    }));
  };
  // console.log("cheed", checked);

  // console.log("Form Data before saving:", formData);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("categories")) || [];
    setSavedCategories(savedData);
  }, []);
  // const checklistdata = JSON.parse(localStorage.getItem("categories"))
  // console.log(checklistdata.map((sd) => {
  //     console.log(sd);

  // }));

  const handleClickOutside = (event) => {
    // if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
    //     // setActiveDialogIndex(null);
    //     setOpen(false);
    //     setFormData({ category: '', note: '', description: '', details: '' });
    // }
  };

  const categorySave = () => {
    if (!formData.category.trim()) {
      toast.info("Category cannot be empty!", {
        pauseOnHover: false,
      });
      return;
    }
    const newEntry = {
      category: formData.category,
      checklist: [],
    };
    const updatedCategories = [...savedCategories];

    if (editIndex !== null) {
      updatedCategories[editIndex] = newEntry;
    } else {
      updatedCategories.push(newEntry);
    }

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setSavedCategories(updatedCategories);
    handleClose();
    setActiveDialogIndex(null);
  };

  const categoryDelete = (index) => {
    const updatedCategories = savedCategories.filter((_, i) => i !== index);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setSavedCategories(updatedCategories);
    if (activeDialogIndex === index) {
      setActiveDialogIndex(null);
    }
  };
  const calculateDateDifference = (selectedDate) => {
    // console.log("selcteddate", selectedDate);

    const today = dayjs();

    // console.log("Today:",);

    const difference = selectedDate.diff(today, "day");

    if (difference < 0) return "";
    if (difference === 0) return today.format("MMMM D");
    if (difference > 1) return selectedDate.format("MMMM D");
    if (difference === 7) return "1 week";
    if (difference > 7 && difference <= 30)
      return `${Math.floor(difference / 7)} weeks`;
    if (difference > 30 && difference <= 365)
      return `${Math.floor(difference / 30)} months`;
    return `${Math.floor(difference / 365)} years`;
  };

  const handleClose = () => {
    setFormData({
      category: "",
      checklist: {
        note: "",
        description: "",
        details: "",
        date: null,
        assigment: null,
      },
    });
    setOpen(false);
  };

  const openDialog = (index = null) => {
    if (index !== null) {
      setEditIndex(index);
      const categoryData = savedCategories[index];
      setFormData({
        category: categoryData.category,
        checklist: categoryData.checklist
          ? {
              note: "",
              description: "",
              details: "",
            }
          : {
              note: "",
              description: "",
              details: "",
              date: null,
              assigment: null,
            },
      });
      setAssigment(null);
      setActiveDialogIndex(index);
    } else {
      setEditIndex(null);
      setFormData({
        category: "",
        checklist: {
          note: "",
          description: "",
          details: "",
          date: null,
          assigment: null,
        },
      });
      setActiveDialogIndex(null);
      setAssigment(null);
    }
    setOpen(true);
  };

  const handleChecklistDelete = (categoryIndex, checklistIndex) => {
    const updatedCategories = [...savedCategories];

    if (updatedCategories[categoryIndex]?.checklist) {
      updatedCategories[categoryIndex].checklist = updatedCategories[
        categoryIndex
      ].checklist.filter((_, i) => i !== checklistIndex);
    }

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setSavedCategories(updatedCategories);
    toast.success("Checklist item deleted!", {
      pauseOnHover: false,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (activeDialogIndex !== null) {
      setFormData((prevState) => ({
        ...prevState,
        checklist: {
          ...prevState.checklist,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const saveChecklistItem = (index) => {
    if (
      !formData.checklist.details.trim() &&
      !formData.checklist.description.trim() &&
      !formData.checklist.note.trim()
    ) {
      toast.info("Checklist cannot be empty", {
        pauseOnHover: false,
      });
      return;
    }
    const updatedCategories = [...savedCategories];
    const checklistItem = {
      ...formData.checklist,
      date: formData.checklist.date
        ? formData.checklist.date.format("YYYY-MM-DD")
        : null,
    };

    if (editIndex !== null) {
      if (!updatedCategories[index].checklist) {
        updatedCategories[index].checklist = [];
      }
      updatedCategories[index].checklist[editIndex] = checklistItem;
    } else {
      if (!updatedCategories[index].checklist) {
        updatedCategories[index].checklist = [];
      }
      updatedCategories[index].checklist.push(checklistItem);
    }

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setSavedCategories(updatedCategories);
    setActiveDialogIndex(null);
    setFormData({
      category: formData.category,
      checklist: {
        note: "",
        description: "",
        details: "",
        date: null,
        assigment: null,
      },
    });
    setAssigment(null);
    toast.success("Checklist item saved!", {
      pauseOnHover: false,
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handlecancel = () => {
    setFormData({
      category: "",
      note: "",
      description: "",
      details: "",
      date: null,
      assigment: null,
    });
    setActiveDialogIndex(null);
    setAssigment(null);
  };

  // console.log("savedCategories", savedCategories)
  return (
    <>
      <h1 className="categoryheading">Checklist</h1>
      <ToastContainer />
      <Button
        variant="contained"
        onClick={() => openDialog()}
        sx={{ backgroundColor: "#000000", color: "white" }}
      >
        ADD CATEGORY
      </Button>

      <Box mt={2}>
        {savedCategories.length > 0 && (
          <ul>
            {savedCategories.map((item, categoryIndex) => (
              <Box
                key={categoryIndex}
                sx={{ position: "relative", padding: "8px" }}
                onMouseEnter={() => setHoverIndex(categoryIndex)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {hoverIndex === categoryIndex && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      left: "0px",
                      opacity: 1,
                      top: "12px",
                      transition: "opacity 0.2s ease-in-out",
                    }}
                  >
                    <AddIcon
                      onClick={() => setActiveDialogIndex(categoryIndex)}
                      sx={{ cursor: "pointer", fontSize: "20px" }}
                    />
                    <DeleteIcon
                      onClick={() => categoryDelete(categoryIndex)}
                      sx={{ cursor: "pointer", fontSize: "20px" }}
                    />
                  </Box>
                )}

                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "900",
                    marginLeft: "40px",
                    fontFamily: "Avenir LT Std",
                  }}
                >
                  {item.category.toUpperCase()}
                </Typography>

                {item.checklist.length > 0
                  ? item.checklist.map((checklistItem, checklistIndex) => (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          key={checklistIndex}
                          onMouseEnter={() =>
                            handleMouseEnter(categoryIndex, checklistIndex)
                          }
                          onMouseLeave={() => handleMouseLeave(categoryIndex)}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                cursor: "pointer",
                                fontSize: "20px",
                                visibility:
                                  hoveredChecklist[categoryIndex] ===
                                  checklistIndex
                                    ? "visible"
                                    : "hidden", // Reserve space when hidden
                                opacity:
                                  hoveredChecklist[categoryIndex] ===
                                  checklistIndex
                                    ? 1
                                    : 0, // Smooth transition
                                transition: "opacity 0.2s ease-in-out", // Add smooth fade-in transition
                              }}
                              onClick={() =>
                                handleChecklistDelete(
                                  categoryIndex,
                                  checklistIndex
                                )
                              }
                            />
                            <Checkbox
                              value={checked}
                              checked={isChecked(categoryIndex, checklistIndex)}
                              onChange={() =>
                                handleCheckboxChange(
                                  categoryIndex,
                                  checklistIndex
                                )
                              }
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                            />
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "300",
                                fontFamily: "Avenir LT Std",
                              }}
                              className={`${
                                isChecked(categoryIndex, checklistIndex)
                                  ? "text"
                                  : ""
                              }`}
                            >
                              {checklistItem?.note}
                            </Typography>
                          </Box>

                          <Typography className="date">
                            {checklistItem.date &&
                              calculateDateDifference(
                                dayjs(checklistItem?.date)
                              )}
                          </Typography>
                        </Box>
                      </>
                    ))
                  : ""}

                {/* <Typography
                                    sx={{
                                        fontSize: "20px",
                                        fontWeight: "bolder",
                                        marginLeft: "40px",
                                    }}
                                >
                                    {item.checklist.length > 0
                                        ? item.checklist.map((checklistItem, checklistIndex) => (
                                            <>


                                                <Box
                                                    key={checklistIndex}
                                                    sx={{
                                                        display: "flex", alignItems: "center"
                                                    }}

                                                    onMouseEnter={() => handleMouseEnter(categoryIndex, checklistIndex)}
                                                    onMouseLeave={() => handleMouseLeave(categoryIndex)}
                                                >
                                                    {
                                                        hoveredChecklist[categoryIndex] === checklistIndex && (
                                                            <DeleteIcon
                                                                sx={{ cursor: "pointer", fontSize: "20px" }}
                                                                onClick={() => handleChecklistDelete(categoryIndex, checklistIndex)}
                                                            />
                                                        )
                                                    }

                                                    <Box sx={{ display: "flex", alignItems: "center" }}>

                                                        <Checkbox
                                                            value={checked}
                                                            checked={isChecked(categoryIndex, checklistIndex)}
                                                            onChange={() => handleCheckboxChange(categoryIndex, checklistIndex)}
                                                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                                        />
                                                        <Typography sx={{
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                            fontFamily: "Avenir LT Std"

                                                        }}
                                                            className={`${isChecked(categoryIndex, checklistIndex) ? "text" : ""}`}>
                                                            {checklistItem?.note}
                                                        </Typography>
                                                    </Box>






                                                    <Typography sx={{
                                                        fontSize: "14px",
                                                        fontWeight: "600",
                                                        fontFamily: "Avenir LT Std",
                                                        borderLeft: "1px solid black"

                                                    }}>{checklistItem.date && calculateDateDifference(dayjs(checklistItem?.date))}</Typography>

                                                </Box>
                                            </>
                                        ))
                                        : ""}

                                </Typography> */}
                {activeDialogIndex === categoryIndex && (
                  <Box
                    ref={descriptionRef}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "16px",
                      boxShadow: 2,
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <TextField
                        name="description"
                        placeholder="Enter a task description"
                        sx={{ marginRight: "8px", width: "100%" }}
                        required
                        variant="outlined"
                        value={formData?.checklist?.description}
                        onChange={handleInputChange}
                      />

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker"]}
                          sx={{ padding: "0px" }}
                        >
                          <DatePicker
                            value={formData?.checklist?.date}
                            onChange={(newValue) => {
                              // console.log("newvalue", newValue);

                              setValue(newValue);
                              setFormData((prevState) => ({
                                ...prevState,
                                checklist: {
                                  ...prevState.checklist,
                                  date: newValue,
                                },
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField {...params} variant="outlined" />
                            )}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>

                    <TextField
                      name="details"
                      placeholder="Details"
                      fullWidth
                      required
                      variant="outlined"
                      sx={{ marginBottom: "12px" }}
                      value={formData?.checklist?.details}
                      onChange={handleInputChange}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <Typography sx={{ marginRight: "8px" }}>
                        Pre-Assignment:
                      </Typography>
                      <TextField
                        name="note"
                        placeholder="Add note"
                        sx={{ width: "40%" }}
                        required
                        variant="outlined"
                        value={formData?.checklist?.note}
                        onChange={handleInputChange}
                      />
                      <Typography
                        sx={{ marginRight: "8px", marginLeft: "10px" }}
                      >
                        Add Assignment:
                      </Typography>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={assigment}
                          placeholder="Add assignment"
                          onChange={handleChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="assigment1">Me</MenuItem>
                          <MenuItem value="assigment2">Jhon</MenuItem>
                          <MenuItem value="assigment3">James</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        onClick={() => saveChecklistItem(activeDialogIndex)}
                        sx={{
                          backgroundColor: "#000",
                          color: "white",
                          marginRight: "8px",
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handlecancel}
                        sx={{ backgroundColor: "#000", color: "white" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </ul>
        )}
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editIndex !== null ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 2 }}>
            <TextField
              name="category"
              label="Category"
              variant="outlined"
              value={formData.category}
              required
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={categorySave}
              fullWidth
              sx={{ backgroundColor: "#000000", color: "white" }}
            >
              {editIndex !== null ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checklist;
