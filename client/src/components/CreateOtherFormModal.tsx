import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

import { createOtherForm } from "../api/works";

const CreateOtherForm = ({
  fid,
  open,
  handleClose,
}: {
  fid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [isClass, setIsClass] = useState<number>(0);
  const [isGroupInsurance, setIsGroupInsurance] = useState<number>(0);
  const [isLabelInsurance, setIsLabelInsurance] = useState<number>(0);
  const [isBunnyShoe, setIsBunnyShoe] = useState<number>(0);
  const [isBunnySuit, setIsBunnySuit] = useState<number>(0);
  const [otherForm, setOtherForm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateOtherForm = async () => {
    const data = {
      fid,
      is_class: isClass < 1 ? true : false,
      is_group_insurance: isGroupInsurance < 1 ? true : false,
      is_label_insurance: isLabelInsurance < 1 ? true : false,
      is_bunny_shoe: isBunnyShoe < 1 ? true : false,
      is_bunny_suit: isBunnySuit < 1 ? true : false,
      other_form: otherForm,
    };
    setLoading(true);
    try {
      await createOtherForm(data);
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
          gap: "1rem",
          backgroundColor: "#fff",
          width: "80vw",
          maxHeight: "80vh",
          overflowY: "scroll",
          borderRadius: "1rem",
          transform: "translate(calc(10vw - 50px), 5vh)",
        }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h5">建立停電狀況</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="當天上課"
                size="small"
                name={"is_class"}
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={isClass}
                select
                onChange={(e) => setIsClass(+e.target.value)}>
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="團險證明"
                size="small"
                value={isGroupInsurance}
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                onChange={(e) => setIsGroupInsurance(+e.target.value)}
                name="is_group_insurance">
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="勞保證明"
                value={isLabelInsurance}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                onChange={(e) => setIsLabelInsurance(+e.target.value)}
                name="is_label_insurance">
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="無塵鞋套"
                value={isBunnyShoe}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                onChange={(e) => setIsBunnyShoe(+e.target.value)}
                name="is_bunny_shoe">
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="無塵服"
                value={isBunnySuit}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                onChange={(e) => setIsBunnySuit(+e.target.value)}
                name="is_bunny_suit">
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="其他表格"
                value={otherForm}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                name="other_form"
                onChange={(e) => setOtherForm(e.target.value)}
              />
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}>
                取消
              </Button>
              <Button
                disabled={
                  !isClass ||
                  !isGroupInsurance ||
                  !isLabelInsurance ||
                  !isBunnyShoe ||
                  !isBunnySuit ||
                  !otherForm
                }
                variant="contained"
                onClick={handleCreateOtherForm}>
                建立
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CreateOtherForm;
