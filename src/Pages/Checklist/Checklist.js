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
  Tab,
  Tabs,
  IconButton,
  Grid2,
  Avatar,
  Popover,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,

} from "@mui/material";
import PropTypes from 'prop-types';
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
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import EditIcon from '@mui/icons-material/Edit';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1.5 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  // console.log("------", index)
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const label = { inputProps: { 'aria-label': 'Hide Completed' } };

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
  const noteRef = useRef(null);
  const [showButton, setshowButton] = useState(false);
  const [hide, sethide] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    checklist: {
      note: "",
      description: "",
      details: "",
      date: null,
      assigment: null,
      comment: ""
    },
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  console.log(activeDialogIndex);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleshare = (event) => {
    setAnchorE2(event.currentTarget);
  }
  const handleshareclose = () => {
    setAnchorE2(null);
  };

  const openbox = Boolean(anchorEl);
  const openbox2 = Boolean(anchorE2);
  const id = openbox ? 'simple-popover' : undefined;
  const id2 = openbox2 ? 'simple-popover' : undefined;
  const data = JSON.parse(localStorage.getItem('categories')) || [];

  // console.log("XS", formData.category.date);

  const [assigment, setAssigment] = useState(null);
  const [hoveredChecklist, setHoveredChecklist] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedtab, setSelectedTab] = React.useState(0);

  const handletabchange = (event, newValue) => {
    // console.log("newValue", newValue)
    setSelectedTab(newValue);
  };
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

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("categories")) || [];
    setSavedCategories(savedData);
  }, []);


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
    const today = dayjs().startOf('day');

    const difference = selectedDate.diff(today, "day");

    if (difference < 0) return "";
    if (difference === 0) return today.format("MMMM D");
    if (difference === 1) return selectedDate.format("MMMM D");
    if (difference < 7) return selectedDate.format("MMMM D");
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
            comment: ""
          },
      });
      setAssigment(null);
      setActiveDialogIndex(index);
      setshowButton(false)
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
          comment: ""
        },
      });
      setActiveDialogIndex(null);
      setAssigment(null);
    }
    setOpen(true);
  };

  const openNoteDialog = (categoryIndex, checklistIndex) => {
    setshowButton(true)
    setEditIndex(checklistIndex);
    // sethide(true)
    const checklistData = savedCategories[categoryIndex].checklist[checklistIndex];
    // console.log("checklistData", checklistData);

    setFormData({

      checklist: {
        note: checklistData.note,
        description: checklistData.description,
        details: checklistData.details,
        date: checklistData.date ? dayjs(checklistData.date) : null,
        assigment: checklistData.assigment,
        comment: checklistData.comment,
      },
    });
    setActiveDialogIndex(categoryIndex);
    // setOpen(true);
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
      toast.info("Checklist cannot be empty", { pauseOnHover: false });
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

      updatedCategories[index].checklist[editIndex] = checklistItem;
    } else {
      updatedCategories[index].checklist.push(checklistItem);
    }
   
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setshowButton(false)
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
        comment: ""
      },
    });
    setAssigment(null);
    toast.success("Checklist item saved!", { pauseOnHover: false });
  };



  const handlecancel = () => {
    setFormData({
      category: "",
      note: "",
      description: "",
      details: "",
      date: null,
      assigment: null,
      comment: ""
    });
    setActiveDialogIndex(null);
    setAssigment(null);
  };

  // console.log("savedCategories", selectedtab)
  return (
    <>
      {/* <h1 className="categoryheading">Checklist</h1> */}
      <ToastContainer />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <Button
          variant="contained"
          onClick={() => openDialog()}
          sx={{ backgroundColor: "#000000", color: "white", mb: 1.5 }}
          className={`${selectedtab == 0 ? "tabhide" : ""}`}
        >
          ADD CATEGORY
        </Button>

        <Box>
          <Box sx={{ borderColor: 'divider' }}>
            <Tabs value={selectedtab} onChange={handletabchange} aria-label="basic tabs example">
              <Tab label=" ASSIGMET OVERVIEW " {...a11yProps(0)} />
              <Tab label="FULL CHECKLIST" {...a11yProps(1)} />

            </Tabs>
          </Box>


        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className={`${selectedtab == 0 ? "tabhide" : ""}`}>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ backgroundColor: "#000000", color: "white", mb: 1.5 }}
          >
            VIEW OPTIONS
          </Button>
          <Popover
            id={id}
            open={openbox}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{ width: '100%', height: 'auto', padding: '10px' }}
          >
            <Box sx={{ p: 2 }}>
              <Typography sx={{ color: "black", fontWeight: "600" }}>VIEW BY</Typography>
              <FormControl>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Category" />
                  <FormControlLabel value="male" control={<Radio />} label="Due Date" />

                </RadioGroup>
              </FormControl>
              <Typography sx={{ color: "black", fontWeight: "600" }}>Items</Typography>
              <FormControlLabel control={<Checkbox {...label} />} label="Hide Completed" sx={{ mt: 1 }} />
            </Box>
          </Popover>
          <Button
            sx={{ mb: 1.5, backgroundColor: "#000000", ml: 1 }}
            onClick={handleshare}
            variant="contained"
          >
            <ReplyAllOutlinedIcon />
          </Button>

          <Popover
            id={id2}
            open={openbox2}
            anchorEl={anchorE2}
            onClose={handleshareclose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{ width: '100%', height: 'auto', padding: '10px' }}
          >
            <Box sx={{ p: 2 }}>
              <Button sx={{ mb: 1.5, backgroundColor: "#000000" }} variant="contained">
                DOWNLOAD CHECkLIST AS PDF
              </Button>
              <Typography sx={{ color: "black", fontWeight: "600" }}>OPTIONS</Typography>
              <Stack sx={{ mt: 1 }}>
                <FormControlLabel control={<Checkbox {...label} />} label="Include Details" />
                <FormControlLabel control={<Checkbox {...label} />} label="Hide Completed Items" />
              </Stack>
            </Box>
          </Popover>
        </Box >
      </Box >
      <Divider sx={{ marginTop: "10px" }} />

      <CustomTabPanel value={selectedtab} index={0} >
        <Grid2 container spacing={30} mt={2} sx={{ paddingLeft: "60px" }}>
          {data.map((item, index) => (
            item.checklist.map((checklistItem, checklistIndex) => (
              <Grid2 key={`${index}-${checklistIndex}`} lg={6} md={6} sm={12} xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      color: "gray",
                      border: "3px solid gray",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    CG
                  </Box>
                  <Box sx={{ marginLeft: "20px" }}>
                    <Typography sx={{ color: "black", fontWeight: "600" }}>
                      {checklistItem.assigment.toUpperCase()}
                    </Typography>
                    <Typography><i>Planner</i></Typography>
                    <Typography sx={{ color: "gray" }}>
                      <i>No tasks currently assigned</i> <span style={{ color: "#DCAE96" }}>+add task</span>
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
            ))
          ))}
        </Grid2>
      </CustomTabPanel>

      <CustomTabPanel value={selectedtab} index={1}>
        <Box mt={2} >
          {savedCategories.length > 0 && (
            <ul style={{ padding: "0px" }}>
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
                            paddingX: "0px"
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
                                    : "hidden",
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
                            />
                            <Typography

                              sx={{
                                fontSize: "16px",
                                fontWeight: "100 !important",
                                // fontFamily: "Avenir LT Std",
                                cursor: "pointer"
                              }}
                              className={`${isChecked(categoryIndex, checklistIndex)
                                ? "text"
                                : ""
                                }`}
                              onClick={() => openNoteDialog(categoryIndex, checklistIndex)}
                            >
                              {checklistItem?.note}
                            </Typography>
                          </Box>

                          <Typography className="date" onClick={() => openNoteDialog(categoryIndex, checklistIndex)}>
                            {checklistItem.date &&
                              calculateDateDifference(
                                dayjs(checklistItem?.date)
                              )}
                          </Typography>
                        </Box>
                      </>
                    ))
                    : ""}


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
                            value={formData?.checklist?.assigment}
                            placeholder="Add assignment"
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="Me">Me</MenuItem>
                            <MenuItem value="Jhon">Jhon</MenuItem>
                            <MenuItem value="James">James</MenuItem>
                          </Select>
                        </FormControl>

                      </Box>
                      <TextField
                        name="comment"
                        placeholder="Enter a comment"
                        sx={{ width: "100%" }}
                        required
                        variant="outlined"
                        value={formData?.checklist?.comment}
                        onChange={handleInputChange}
                      />
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                          variant="contained"
                          onClick={() => saveChecklistItem(activeDialogIndex)}
                          sx={{
                            backgroundColor: "#000",
                            color: "white",
                            marginRight: "8px",
                          }}
                        >
                          {showButton ? "Update" : "Save"}
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
      </CustomTabPanel>
    </>
  );
};

export default Checklist;
