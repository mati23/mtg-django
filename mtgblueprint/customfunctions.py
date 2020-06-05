def search_dict_in_array(array, value):

    if array == None or  len(array) <= 0:
        if value.isnumeric():
            array.append({"color": "number", "quantity": value})
        else:
            array.append({"color": value, "quantity": 1})
        return array
    elif value.isnumeric() == True:
        for item in array:
            if item["color"] == "number":
                item["quantity"] = str(int(item["quantity"])+int(value))
                return array
        array.append({"color": "number", "quantity": value})
    else:
        for index in array:
            if index["color"] == value:
                index["quantity"] = index["quantity"] + 1
                return array

        array.append({"color": value, "quantity": 1})
        return array