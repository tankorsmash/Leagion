import humanize


#utils
def _pretty(input):
    result = humanize.intword(input, format="%.2f")
    if len(result) > 50:
        return "Too damn many"
    return result


