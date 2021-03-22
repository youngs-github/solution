// 实现简易版JSON.stringify
function stringify(obj) {
    // 基本类型中, fn、sym、undef转为undefined(非字符), string中若包含"需将其转为\"
    // 对象类型中, fn、sym、undef忽略, 若存在toJSON方法时, 使用其结果
    // 数组类型中, 继承对象类型, fn、sym、undef转为null
    if (typeof obj === 'object') {
        // 对象类型
        if (obj === null) return 'null';
        if (typeof obj.toJSON === 'function') {
            return stringify(obj.toJSON());
        }
        if (Array.isArray(obj)) {
            const ans = new Array(obj.length);
            for (let i = 0; i < obj.length; i++) {
                ans[i] = isUndef(obj[i]) ? 'null' : stringify(obj[i]);
            }
            return `[${ans.join(',')}]`;
        } else {
            const ans = [];
            for (let key in obj) {
                if (!isUndef(obj[key])) {
                    ans.push(`"${key}":${stringify(obj[key])}`);
                }
            }
            return `{${ans.join(',')}}`;
        }
    } else {
        if (isUndef(obj)) return undefined;
        return typeof obj === 'string' ? `"${obj.replace(/"/g, '\\"')}"` : String(obj);
    }
}

// 判断方法
function isUndef(s) {
    return s === undefined || typeof s === 'symbol' || typeof s === 'function';
}

// @test
if (describe) {
    describe('实现JSON.stringify.js', () => {
        // 变量
        const t1 = 1;
        const t2 = '2';
        const t3 = [t1];
        const t4 = { k1: t1, k2: t2 };
        const t5 = new Date();
        const t6 = null;
        const t7 = undefined;
        const t8 = function () {};
        const t9 = [
            { toJSON: {} },
            {
                toJSON: function () {
                    return '1"2"3';
                }
            }
        ];
        const t10 = [t1, t2, t3, t4, t5, t6, t7, t8, { k: 9, ch: [99, { chs: [999] }] }];
        it('示例01', () => {
            const a1 = stringify(t1);
            const a2 = JSON.stringify(t1);
            expect(a1).toBe(a2);
        });
        it('示例02', () => {
            const a1 = stringify(t2);
            const a2 = JSON.stringify(t2);
            expect(a1).toBe(a2);
        });
        it('示例03', () => {
            const a1 = stringify(t3);
            const a2 = JSON.stringify(t3);
            expect(a1).toBe(a2);
        });
        it('示例04', () => {
            const a1 = stringify(t4);
            const a2 = JSON.stringify(t4);
            expect(a1).toBe(a2);
        });
        it('示例05', () => {
            const a1 = stringify(t5);
            const a2 = JSON.stringify(t5);
            expect(a1).toBe(a2);
        });
        it('示例06', () => {
            const a1 = stringify(t6);
            const a2 = JSON.stringify(t6);
            expect(a1).toBe(a2);
        });
        it('示例07', () => {
            const a1 = stringify(t7);
            const a2 = JSON.stringify(t7);
            expect(a1).toBe(a2);
        });
        it('示例08', () => {
            const a1 = stringify(t8);
            const a2 = JSON.stringify(t8);
            expect(a1).toBe(a2);
        });
        it('示例09', () => {
            const a1 = stringify(t9);
            const a2 = JSON.stringify(t9);
            expect(a1).toBe(a2);
        });
        it('示例10', () => {
            const a1 = stringify(t10);
            const a2 = JSON.stringify(t10);
            expect(a1).toBe(a2);
        });
    });
}
