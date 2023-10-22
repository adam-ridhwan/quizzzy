import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import CheckboxChecked from "@/components/ui/icons/checkbox-checked";
import CheckboxEmpty from "@/components/ui/icons/checkbox-empty";
import {Choices} from "@/types/quiz-types";

import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {ChangeEvent, useEffect, useState} from "react";

type Props ={
  choices: Choices;
  correctAnswers: Choices;
}

const Choices = ({choices,correctAnswers}: Props) => {
  const [editedChoices, setEditedChoices] = useState<Choices>(choices)

  useEffect(() => {
    console.log(editedChoices)
  }, [editedChoices]);

  const handleEditChoice = (e: ChangeEvent<HTMLTextAreaElement>, choiceIdx: number) => {
    const newChoices = [...editedChoices];
    newChoices[choiceIdx] = e.target.value;
    setEditedChoices(newChoices);
  }


  return (
    <>

    </>
  );
};

export default Choices;
