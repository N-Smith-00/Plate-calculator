plate_options = {
    55:False,
    45:True,
    35:True,
    25:True,
    10:True,
    5:True,
    2.5:False
}
bar_options = [55,45,25,15]

def calc(weight: int, bar: int) -> dict[int, int]:
    """calculates the plates for one side of the bar

    Args:
        weight (int): total weight (bar+plates)
        bar (int): weight of the bar

    Returns:
        dict[int, int]: plates to be put on one side of the bar. {weight: ammount}
    """    
    plates = {}
    weight -= bar
    weight /= 2
    for op in [k for k in plate_options.keys() if plate_options[k]]:
        if weight >= op:
            plates[op] = int(weight//op)
            weight = weight%op
    
    return plates