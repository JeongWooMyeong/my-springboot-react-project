import CategoryColumn from "./CategoryColumns";

export default function CategorySelector({
                                             level1List, level2List, level3List,
                                             selectedLevel1, selectedLevel2, selectedLevel3,
                                             onLevel1Click, onLevel2Click, onLevel3Click
                                         }) {
    return (
        <div style={{ display: "flex", gap: 20, marginBottom: 20, width: "100%" }}>
            <CategoryColumn title="분류1" list={level1List} selected={selectedLevel1} onClick={onLevel1Click} />
            <CategoryColumn title="분류2" list={level2List} selected={selectedLevel2} onClick={onLevel2Click} />
            <CategoryColumn title="분류3" list={level3List} selected={selectedLevel3} onClick={onLevel3Click} />

        </div>
    );
}
