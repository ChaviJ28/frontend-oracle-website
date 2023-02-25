$(document).ready(function() {
    initListeners();

    function initListeners() {
        $("#formSubmitBtn").click(function(e) {
            e.preventDefault();
            onSubmit();
        });
        $("#formClearBtn").click(function(e) {
            e.preventDefault();
            clearForm();
        });
    }

    function validateResponse() {
        //check required=true fields as well
        if (validateEmailInputs()) {
            return true;
        }
        return false;
    }

    function validateEmailInputs() {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
            formBlocks = $(".form-group");
        for (var i = 0; i < formBlocks.length; i++) {
            var formGroup = formBlocks.eq(i)
            if (getFormGroupType(formGroup) == "email") {
                if (!testEmail.test(formGroup[0].children[1].value)) {
                    console.log("email failed");
                    //display error to user
                    return false;
                }
            }
        }
        return true;
    }

    function clearForm() {
        $("input:radio").prop("checked", false);
        $("input:checked").prop("checked", false);
        $("input[type=text], input[type=email], textarea").val("");
        $("select").prop("selectedIndex", 0);
    }

    function getFormId() {
        return $("form").attr("data-id");
    }

    function onSubmit() {
        if (validateResponse()) {
            submit(getResponses());
        }
    }

    function getResponses() {
        var formBlocks = $(".form-group"),
            arr = [];
        for (var i = 0; i < formBlocks.length; i++) {
            var formGroup = formBlocks.eq(i),
                responseObj = {};
            type = getFormGroupType(formGroup);
            switch (type) {
                case "email":
                    responseObj = getTextResponse(formGroup, "email");
                    break;
                case "short_text":
                    responseObj = getTextResponse(formGroup, "short_text");
                    break;
                case "long_text":
                    responseObj = getTextResponse(formGroup, "long_text");
                    break;
                case "radio":
                    responseObj = getRadioResponse(formGroup);
                    break;
                case "checkbox":
                    responseObj = getCheckboxResponse(formGroup);
                    break;
                case "select":
                    responseObj = getSelectResponse(formGroup);
                    break;
                default:
                    return 0;
            }
            arr.push(responseObj);
        }
        return arr;
    }

    function getFormGroupType(formGroup) {
        return formGroup.attr("data-type");
    }

    function getFormGroupIndex(formGroup) {
        return formGroup.attr("data-index");
    }

    function getFormGroupQuestion(formGroup) {
        return formGroup[0].children[0].innerText;
    }

    function getTextResponse(formGroup, type) {
        var obj = {
            index: getFormGroupIndex(formGroup),
            type: type,
            question: getFormGroupQuestion(formGroup),
            answer: formGroup[0].children[1].value
        };
        return obj;
    }

    function getRadioResponse(formGroup) {
        var answer = $("#form-radio-block-" + getFormGroupIndex(formGroup) + " input:radio:checked").val(),
            obj = {
                index: getFormGroupIndex(formGroup),
                type: "radio",
                question: getFormGroupQuestion(formGroup),
                answer: answer
            };
        return obj;
    }

    function getCheckboxResponse(formGroup) {
        var answer = [],
            obj = {
                index: getFormGroupIndex(formGroup),
                type: "checkbox",
                question: getFormGroupQuestion(formGroup),
            };
        $("#form-checkbox-block-" + getFormGroupIndex(formGroup) + " input:checked").each(function() {
            answer.push($(this)[0].value);
        });
        obj.answer = answer;
        return obj;
    }

    function getSelectResponse(formGroup) {
        var obj = {
            index: getFormGroupIndex(formGroup),
            type: type,
            question: getFormGroupQuestion(formGroup),
            answer: formGroup[0].children[1].value
        };
        return obj;
    }

    function submit(responseArray) {
        var successCallback = (resp) => {
            clearForm();
        };

        var errorCallback = function(resp) {
            return;
        };

        var url = "/form/submit"
        if (document.domain.includes("beta.forms")) {
            url = "http://beta.uomoracleclub.com/submit"
        }

        var params = {
            url: url,
            success_callback_function: successCallback,
            error_callback_function: errorCallback,
            show_success_message: true,
            show_error_message: true,
            data: {
                form_id: getFormId(),
                response_array: responseArray
            }
        };

        ajaxLoad(params);
    }

});