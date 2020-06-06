import json
import re
import mtgblueprint.constants as c
from mtgblueprint.model.Cards import Cards

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

def calculate_mana_counter(card_array):
    dictionary_list = []
    pattern = r'\{(.*?)\}'
    for index in card_array:
        card = Cards.objects.get(id=index["id"])
        matches = re.finditer(pattern, card.mana_cost)

        for matchNum, match in enumerate(matches):
            for groupNum in range(0, len(match.groups())):
                for quantity in range(0, int(index["quantity"])):
                    dictionary_list = search_dict_in_array(dictionary_list, match.group(1))

    return dictionary_list

def add_mana_counter_to_global_counter(card_list):
    pattern = r'\{(.*?)\}'
    global_deck_counter = []
    for index in card_list:
        card = Cards.objects.get(id=index["id"])
        matches = re.finditer(pattern, card.mana_cost)

        for matchNum, match in enumerate(matches):
            for groupNum in range(0, len(match.groups())):
                for quantity in range(0, int(index["quantity"])):
                    global_deck_counter = search_dict_in_array(global_deck_counter, match.group(1))

    return global_deck_counter