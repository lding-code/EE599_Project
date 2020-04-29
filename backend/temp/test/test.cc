#include "gtest/gtest.h"
#include "src/solution.h"

#include <string>

TEST(Should1, Return1) {
    Solution solution;

    std::string s = "PAYPALISHIRING";
    int numRows = 3;

    std::string expected = "PAHNAPLSIIGYIR";
    std::string actual = solution.convert(s, numRows);

    EXPECT_EQ(expected, actual);
}

TEST(Should2, Return2) {
    Solution solution;

    std::string s = "PAYPALISHIRING";
    int numRows = 4;

    std::string expected = "PINALSIGYAHRPI";
    std::string actual = solution.convert(s, numRows);

    EXPECT_EQ(expected, actual);
}