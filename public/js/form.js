$(document).ready(function () {
    initListeners();
    var ambient = new Ambient();
    ambient.mount();

    function initListeners() {
        $("#formSubmitBtn").click(function (e) {
            e.preventDefault();
            onSubmit();
        });

        $("#formClearBtn").click(function (e) {
            e.preventDefault();
            clearForm();
        });
    }

    function validateResponse() {
        //check required=true fields as well
        var formBlocks = $(".form-group");
        for (var i = 0; i < formBlocks.length; i++) {
            var formGroup = formBlocks.eq(i);
            if (checkRequiredFields(formGroup) == true) {
                if (getFormGroupType(formGroup) == "email") {
                    if (!validateEmailInputs(formGroup)) {
                        return false;
                    }
                }
            } else {
                return false
            }
        }
        return true;
    }

    function displayFieldError(formGroup, message) {
        formGroup[0].children[1].classList.add("invalid-form");
        var errorLabel = formGroup[0].querySelector(".form-control-error");
        errorLabel.innerHTML = ' ' + message;
        errorLabel.classList.add("error-message-style");
    }

    function clearExistingValidations() {
        $(".invalid-form").removeClass("invalid-form");
        $(".form-control-error").html("");
    }

    function checkRequiredFields(formGroup) {
        var requiredLabel = formGroup[0].querySelector(".required-label");
        if (requiredLabel != null && requiredLabel.attributes[1].value == 'true') {
            if (getFormGroupType(formGroup) == "radio") {
                if ($("#form-radio-block-" + getFormGroupIndex(formGroup) + " input:radio:checked").val() == undefined) {
                    displayFieldError(formGroup, "This is a required Field")
                    return false;
                }
            } else if (getFormGroupType(formGroup) == "checkbox") {
                if ($("#form-checkbox-block-" + getFormGroupIndex(formGroup) + " input:checked").length < 1) {
                    displayFieldError(formGroup, "This is a required Field")
                    return false;
                }
            } else {
                if (formGroup[0].children[1].value.length < 1) {
                    displayFieldError(formGroup, "This is a required Field")
                    return false;
                };
            }
        }
        return true;
    }

    function validateEmailInputs(formGroup) {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test(formGroup[0].children[1].value)) {
            //display error to user
            displayFieldError(formGroup, "Must be a Valid Email Address")
            return false;
        }
        return true;

    }

    function clearForm() {
        clearExistingValidations();
        $("input:radio").prop("checked", false);
        $("input:checked").prop("checked", false);
        $("input[type=text], input[type=email], textarea").val("");
        $("select").prop("selectedIndex", 0);
    }

    function getFormId() {
        return $("form").attr("data-id");
    }

    function onSubmit() {
        clearExistingValidations();
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
        $("#form-checkbox-block-" + getFormGroupIndex(formGroup) + " input:checked").each(function () {
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

        var errorCallback = function (resp) {
            return;
        };

        var url = "/form/submit"
        if (document.domain.includes("beta.forms")) {
            url = "/submit"
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