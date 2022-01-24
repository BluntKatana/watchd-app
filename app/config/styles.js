import colors from "./colors";

export default {
  colors,
  shadow: {
    //Bug fix waarbij schaduw niet overloopt (overflow: "visible" werkt niet)
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
  header: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  regularText: {
    color: colors.white,
    fontSize: 14,
  },
};
