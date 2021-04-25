const Pending = 'pending';
const Fulfilled = 'fulfilled';
const Rejected = 'rejected';

/**
 * 模拟Promise
 * @param {*} executor(resolve, reject)
 */
function Promise(executor) {
	const scope = this;
    // 接收执行函数
    scope.status = Pending;
    // 存储执行结果
    scope.result = undefined;
    // 存储异常信息
    scope.reason = undefined;
    // 存储fulfill、reject回调
    scope.onResolved = [];
    scope.onRejected = [];
    // 执行
    try {
        executor.call(scope, resolve, reject);
    } catch (e) {
        reject(e);
    }
    // 成功方法
    function resolve(value) {
        if (scope.status === Pending) {
            scope.status = Fulfilled;
            scope.onResolved.forEach((onResolve) => {
                onResolve.call(scope, value);
            });
        }
    }
    // 异常方法
    function reject(err) {
        if (scope.status === Pending) {
            scope.status = Rejected;
            scope.onRejected.forEach((onReject) => {
                onReject.call(scope, err);
            });
        }
    }
}

// then方法
Promise.prototype.then = function (onResolve, onReject) {
    const scope = this;
    // 格式化成fn
    onResolve = typeof onResolve === 'function' ? onResolve : (res) => res;
    onReject =
        typeof onReject === 'function'
            ? onReject
            : (reason) => {
                  throw reason;
              };
    // 执行方法
    const promise = new Promise((resolve, reject) => {
        // 先执行, 再检测结果
        const _onResolve = () => {
            try {
                const res = onResolve(scope.result);
                // 检测结果类型
                resolvePromise(promise, res, resolve, reject);
            } catch (e) {
                reject(e);
            }
        };
        const _onReject = () => {
            try {
                const res = onReject(scope.reason);
                // 检测结果类型
                resolvePromise(promise, res, resolve, reject);
            } catch (e) {
                reject(e);
            }
        };
        // 利用延时模拟微任务
        if (scope.status === Pending) {
            // 加入待执行队列
            scope.onResolved.push(() => setTimeout(_onResolve));
            scope.onRejected.push(() => setTimeout(_onReject));
        } else if (scope.status === Fulfilled) {
            // 已完成, 异步执行
            setTimeout(_onResolve);
        } else if (scope.status === Rejected) {
            // 已异常, 异步执行
            setTimeout(_onReject);
        }
    });
    return promise;
};

/**
 * 检测结果类型
 * 1、不能返回自身
 * 2、结果是object、function时, 如果存在.then, 且为function时, 进行执行（当做promise类型）
 * 3、结果是其他类型时, 直接返回
 * @param {*} promise
 * @param {*} result
 * @param {*} resolve
 * @param {*} reject
 */
function resolvePromise(promise, result, resolve, reject) {
    if (promise === result) {
        return reject(new TypeError('不能返回自身...'));
    }
    if (result && (typeof result === 'object' || typeof result === 'function')) {
        let then;
        let used = false;
        try {
            then = result.then;
            if (typeof then === 'function') {
                then.call(
                    result,
                    (res) => {
                        if (used) return;
                        used = true;
                        // 继续递归类型判断
                        resolvePromise(promise, res, resolve, reject);
                    },
                    (err) => {
                        if (used) return;
                        used = true;
                        // 异常, 返回
                        reject(err);
                    }
                );
            } else {
                if (used) return;
                used = true;
                resolve(result);
            }
        } catch (e) {
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        resolve(result);
    }
}
